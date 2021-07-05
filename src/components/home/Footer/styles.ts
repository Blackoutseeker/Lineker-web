import styled from 'styled-components'

export const FooterContainer = styled.footer`
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 0 20px;
`

export const FooterText = styled.span`
  color: #fff;
  font-size: 16px;
`

export const ImageContent = styled.a`
  position: absolute;
  right: 0;
  display: flex;
  @media screen and (max-width: 740px) {
    display: none;
  }
`
