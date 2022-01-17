import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { useMemo } from 'react'
import hasura from '../hasura'
import { notEmpty } from '../helpers'

export type ResourceType =
  | 'program_package'
  | 'program_package_plan'
  | 'program'
  | 'program_content'
  | 'program_plan'
  | 'activity'
  | 'activity_ticket'
  | 'podcast_album'
  | 'podcast_plan'
  | 'podcast_program'
  | 'member_shop'
  | 'merchandise'
  | 'merchandise_spec'
  | 'project'
  | 'post'
  | 'member'
  | 'unknown'

export type Resource = {
  id: string
  urn: string
  type: ResourceType
  title: string
  sku?: string
  price?: number
  categories?: string[]
  variants?: string[]
}

export const useResourceCollection = (urns: string[]) => {
  const { data } = useQuery<hasura.GET_RESOURCE_COLLECTION, hasura.GET_RESOURCE_COLLECTIONVariables>(
    GET_RESOURCE_COLLECTION,
    {
      variables: { urns },
    },
  )
  const resourceCollection: Resource[] = useMemo(
    () =>
      data?.resource
        .map((resourceData, idx) => {
          const urn = urns[idx]
          const [, resourceType, resourceId] = urn.split(':')
          return resourceData
            ? {
                urn,
                id: resourceId,
                type: resourceType as ResourceType,
                title: resourceData.name || '',
                price: resourceData.price || undefined,
                categories: resourceData.categories || [],
                variants: resourceData.variants || [],
                sku: resourceData.sku || undefined,
              }
            : null
        })
        .filter(notEmpty) || [],
    [data, urns],
  )
  return {
    resourceCollection,
  }
}

const GET_RESOURCE_COLLECTION = gql`
  query GET_RESOURCE_COLLECTION($urns: [String!]!) {
    resource(where: { id: { _in: $urns } }) {
      id
      name
      price
      categories
      variants
      sku
    }
  }
`
