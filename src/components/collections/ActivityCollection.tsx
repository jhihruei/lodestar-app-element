import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import moment from 'moment'
import { sum, uniqBy } from 'ramda'
import { StringParam } from 'serialize-query-params'
import { DeepPick } from 'ts-deep-pick/lib'
import { useQueryParam } from 'use-query-params'
import { getActivityCollectionQuery } from '../../graphql/queries'
import * as hasura from '../../hasura'
import { notEmpty } from '../../helpers'
import { Activity, Category } from '../../types/data'
import { ElementComponent } from '../../types/element'
import { CustomSourceOptions, PublishedAtSourceOptions } from '../../types/options'
import ActivityCard from '../cards/ActivityCard'
import CategorySelector from '../common/CategorySelector'
import Collection, { CollectionLayout, ContextCollection } from './Collection'

type ActivityData = DeepPick<
  Activity,
  | 'id'
  | 'coverUrl'
  | 'title'
  | 'isParticipantVisible'
  | 'totalParticipants'
  | 'sessions.[].startedAt'
  | 'sessions.[].endedAt'
  | 'tickets.[].limit'
  | 'categories'
>
type ActivityContextCollection = ContextCollection<ActivityData>

export type ActivityCollectionProps = {
  sourceOptions: CustomSourceOptions | PublishedAtSourceOptions
  variant?: 'card' | 'tile'
  layout?: CollectionLayout
  withSelector?: boolean
}
const ActivityCollection: ElementComponent<ActivityCollectionProps> = props => {
  const [activeCategoryId = null, setActive] = useQueryParam('active', StringParam)

  const { loading, errors, children } = props
  if (loading || errors) {
    return null
  }

  const ElementCollection = Collection(props.variant === 'card' ? ActivityCard : ActivityCard)
  let ContextCollection: ActivityContextCollection
  switch (props.sourceOptions.source) {
    case 'publishedAt':
      ContextCollection = collectPublishedAtCollection(props.sourceOptions)
      break
    case 'custom':
      ContextCollection = collectCustomCollection(props.sourceOptions)
      break
    default:
      ContextCollection = collectPublishedAtCollection(props.sourceOptions)
  }

  return (
    <ContextCollection>
      {ctx => {
        const categories =
          ctx.loading || ctx.errors
            ? []
            : uniqBy((category: Category) => category.id)(
                ctx.data
                  ?.flatMap(d => d.categories)
                  .filter(
                    category =>
                      props.sourceOptions.source === 'custom' ||
                      !props.sourceOptions.defaultCategoryIds?.includes(category.id),
                  ) || [],
              )
        const filter = (d: ActivityData) =>
          !props.withSelector ||
          !activeCategoryId ||
          d.categories.map(category => category.id).includes(activeCategoryId)
        return (
          <div className={props.className}>
            {props.withSelector && (
              <CategorySelector
                categories={categories}
                activeCategoryId={activeCategoryId || null}
                onActive={categoryId => setActive(categoryId)}
              />
            )}
            {children}
            {ctx.loading ? (
              <ElementCollection layout={props.layout} loading />
            ) : ctx.errors ? (
              <ElementCollection layout={props.layout} errors={ctx.errors} />
            ) : (
              <ElementCollection
                layout={props.layout}
                data={ctx.data?.filter(filter) || []}
                renderElement={(activity, ActivityElement) => (
                  <ActivityElement
                    id={activity.id}
                    coverUrl={activity.coverUrl}
                    title={activity.title}
                    isParticipantsVisible={activity.isParticipantVisible}
                    startedAt={moment.min(activity.sessions.map(session => moment(session.startedAt))).toDate()}
                    endedAt={moment.max(activity.sessions.map(session => moment(session.endedAt))).toDate()}
                    participantCount={activity.totalParticipants}
                    totalSeats={sum(activity.tickets.map(ticket => ticket.limit))}
                    categories={activity.categories}
                  />
                )}
              />
            )}
          </div>
        )
      }}
    </ContextCollection>
  )
}

const collectCustomCollection = (options: CustomSourceOptions) => {
  const ActivityElementCollection: ActivityContextCollection = ({ children }) => {
    const {
      data: rawData,
      loading,
      error,
    } = useQuery<hasura.GET_ACTIVITY_COLLECTION, hasura.GET_ACTIVITY_COLLECTIONVariables>(
      getActivityCollectionQuery(activityFields),
      {
        variables: {
          limit: undefined,
          orderByClause: [],
          whereClause: {
            id: { _in: options.idList },
            published_at: { _is_null: false },
          },
        },
      },
    )
    const data = {
      ...rawData,
      activity: options.idList
        .filter(activityId => rawData?.activity.find(p => p.id === activityId))
        .map(activityId => rawData?.activity.find(p => p.id === activityId))
        .filter(notEmpty),
    }
    return children({
      loading,
      errors: error && [new Error(error.message)],
      data: data && composeCollectionData(data),
    })
  }
  return ActivityElementCollection
}

const collectPublishedAtCollection = (options: PublishedAtSourceOptions) => {
  const ActivityElementCollection: ActivityContextCollection = ({ children }) => {
    const { data, loading, error } = useQuery<hasura.GET_ACTIVITY_COLLECTION, hasura.GET_ACTIVITY_COLLECTIONVariables>(
      getActivityCollectionQuery(activityFields),
      {
        variables: {
          whereClause: {
            activity_categories: options.defaultCategoryIds?.length
              ? {
                  category_id: {
                    _in: options.defaultCategoryIds,
                  },
                }
              : undefined,
            activity_tags: options.defaultTagNames?.length
              ? {
                  tag_name: {
                    _in: options.defaultTagNames,
                  },
                }
              : undefined,
          },
          orderByClause: [{ published_at: (options.asc ? 'asc' : 'desc') as hasura.order_by }],
          limit: options.limit,
        },
      },
    )
    return children({
      loading,
      errors: error && [new Error(error.message)],
      data: data && composeCollectionData(data),
    })
  }
  return ActivityElementCollection
}

const composeCollectionData = (data: hasura.GET_ACTIVITY_COLLECTION): ActivityData[] =>
  data?.activity.map(a => ({
    id: a.id,
    title: a.title,
    coverUrl: a.cover_url,
    isParticipantVisible: a.is_participants_visible,
    sessions: a.activity_sessions.map(as => ({
      startedAt: as.started_at,
      endedAt: as.ended_at,
    })),
    tickets: a.activity_tickets.map(at => ({
      limit: at.count,
    })),
    categories: a.activity_categories.map(ac => ({
      id: ac.category.id,
      name: ac.category.name,
    })),
    totalParticipants: 0, // TODO
  })) || []

const activityFields = gql`
  fragment activityFields on activity {
    id
    cover_url
    title
    published_at
    is_participants_visible
    activity_categories {
      category {
        id
        name
      }
    }
    activity_enrollments_aggregate {
      aggregate {
        count
      }
    }
    activity_sessions {
      started_at
      ended_at
    }
    activity_tickets {
      count
    }
  }
`

export default ActivityCollection
