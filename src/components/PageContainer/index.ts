import styled from 'styled-components'

const PageContainer = styled.main`
  display: flex;
  align-items: center;
  flex-direction: column;
  > * {
    transition: 200ms;
  }
  .show-drawer-holder {
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 2;
  }
  .hide-drawer-holder {
    background-color: transparent;
    z-index: -2;
  }
  .show-drawer {
    transform: translateX(0px);
  }
  .hide-drawer {
    transform: translateX(-350px);
  }
  .show-confirmation-holder {
    display: flex;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 2;
  }
  .hide-confirmation-holder {
    display: none;
    background-color: transparent;
    z-index: -2;
  }
  .show-add-holder {
    display: flex;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 2;
  }
  .hide-add-holder {
    display: none;
    background-color: transparent;
    z-index: -2;
  }
  .show-qr-holder {
    display: flex;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 2;
  }
  .hide-qr-holder {
    display: none;
    background-color: transparent;
    z-index: -2;
  }
`

export default PageContainer
