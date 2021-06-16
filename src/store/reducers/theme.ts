const INITIAL_STATE = 'light'

export interface IThemeAction {
  type: 'DARK' | 'LIGHT'
}

const Theme = (state: string = INITIAL_STATE, action: IThemeAction) => {
  switch (action.type) {
    case 'DARK':
      return 'dark'
    case 'LIGHT':
      return 'light'
    default:
      return state
  }
}

export default Theme
