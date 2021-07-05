const INITIAL_STATE = false

type ActionTypes = 'CHANGE_THEME'

export interface ThemeAction {
  type: ActionTypes
}

const Theme = (state: boolean = INITIAL_STATE, action: ThemeAction) => {
  switch (action.type) {
    case 'CHANGE_THEME':
      return !state
    default:
      return state
  }
}

export default Theme
