import styled from 'styled-components'

interface Dimension {
  size?: number
}

const TitleText = styled.span`
  color: #fff;
  font-size: ${(props: Dimension) => props.size}px;
  .alternative-title {
    color: ${({ theme }) => theme.colors.title};
  }
`

export default TitleText
