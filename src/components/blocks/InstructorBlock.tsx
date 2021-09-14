import { useNode } from '@craftjs/core'
import React from 'react'
import styled from 'styled-components'
import { useInstructorCollection } from '../../hooks/data'
import AngleThinLeft from '../../images/icons/angle-thin-left.svg'
import AngleThinRight from '../../images/icons/angle-thin-right.svg'
import Carousel from '../Carousel'
import { CraftSelectedMixin } from '../common'
import Instructor from '../Instructor'
import { BREAK_POINT } from '../Responsive'
import Skeleton from '../Skeleton'

const StyledCarousel = styled(Carousel)<{ selected?: boolean }>`
  && {
    ${props => props.selected && CraftSelectedMixin}
    .slick-next::before,
    .slick-prev::before {
      content: none;
    }
    .slick-prev,
    .slick-next {
      margin-top: -32px;
      width: 64px;
      height: 64px;
      font-size: 64px;
    }
    .slick-prev {
      left: -64px;
      &,
      &:hover,
      &:focus {
        background-image: url(${AngleThinLeft});
      }
    }
    .slick-next {
      right: -64px;
      &,
      &:hover,
      &:focus {
        background-image: url(${AngleThinRight});
      }
    }
  }
`

const InstructorBlock: React.FC<{
  appId: string
  customContentIds?: string[]
  isShowDescription?: boolean
  craftEnabled?: boolean
}> = ({ appId, customContentIds, isShowDescription, craftEnabled }) => {
  const {
    connectors: { connect },
    selected,
  } = useNode(node => ({
    selected: node.events.selected,
  }))
  const { loadingInstructors, errorInstructors, instructors } = useInstructorCollection(appId, {
    ids: customContentIds,
    limit: customContentIds?.length ? undefined : 8,
  })

  if (loadingInstructors)
    return (
      <>
        <Skeleton height="20px" className="my-1" />
        <Skeleton height="20px" className="my-1" />
        <Skeleton height="20px" className="my-1" />
      </>
    )

  if (instructors.length === 0 || errorInstructors) return null

  return (
    <StyledCarousel
      selected={selected}
      arrows
      dots={false}
      draggable
      swipeToSlide
      slidesToShow={instructors.length < 5 ? instructors.length : 5}
      slidesToScroll={1}
      responsive={[
        {
          breakpoint: BREAK_POINT,
          settings: {
            slidesToShow: 1,
          },
        },
      ]}
    >
      {instructors.map(v => (
        <div ref={ref => ref && connect(ref)}>
          <Instructor
            key={v.id}
            id={v.id}
            name={v.name}
            abstract={v.abstract}
            description={v.description}
            avatarUrl={v.avatarUrl}
            isShowDescription={!!isShowDescription}
            craftEnabled={craftEnabled}
          />
        </div>
      ))}
    </StyledCarousel>
  )
}

export default InstructorBlock
