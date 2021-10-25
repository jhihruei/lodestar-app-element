import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { ElementComponent } from '../../types/element'
import Title from './Title'

export const StyledLink = styled(Link)`
  margin-top: 40px;
`
export const StyledTitle = styled(Title)`
  margin: 0 auto;
  margin-bottom: 40px;
`
const StyledSection = styled.section<SectionProps>`
  position: relative;
  background-color: ${props => (props.backgroundType === 'solidColor' && props.solidColor) || 'white'};
  background-image: ${props => props.backgroundType === 'backgroundImage' && `url(${props.coverUrl})`};
  background-size: cover;
  background-position: center;

  ${props =>
    props.variant === 'dark'
      ? css`
          color: white;
          &::after {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.4);
            z-index: -1;
          }
        `
      : css`
          &::after {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(256, 256, 256, 0.4);
            z-index: -1;
          }
        `};
`

export type SectionProps = { variant?: 'dark' } & (
  | {
      backgroundType: 'none'
    }
  | { backgroundType: 'solidColor'; solidColor: string }
  | { backgroundType: 'backgroundImage'; coverUrl: string | null }
)

const Section: ElementComponent<SectionProps> = props => {
  if (props.loading || props.errors) {
    return null
  }
  return <StyledSection {...props}>{props.children}</StyledSection>
}

export default Section
