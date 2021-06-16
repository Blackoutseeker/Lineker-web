import styled from 'styled-components'

interface IProps {
  size?: number
}

const TitleText = styled.span`
  color: #fff;
  font-size: ${(props: IProps) => props.size}px;
  cursor: default;
  .alternative-title {
    color: ${({ theme }) => theme.colors.title};
  }
`

export default TitleText
