import styled from 'styled-components'

interface Dimension {
  size?: number
}

const TitleText = styled.span`
  color: #fff;
  font-size: ${(dimension: Dimension) => dimension.size}px;
  .alternative-title {
    color: ${({ theme }) => theme.colors.title};
  }
`

export default TitleText
