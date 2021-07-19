const INITIAL_STATE = false

type ActionsTypes = 'SET_THEME'

interface ActionsCreators {
  type: ActionsTypes
  payload: {
    theme: boolean
  }
}

const Theme = (state: boolean = INITIAL_STATE, action: ActionsCreators) => {
  switch (action.type) {
    case 'SET_THEME':
      return action.payload.theme
    default:
      return state
  }
}

/**
 * Set a theme to be used by the user
 * @param {boolean} theme - value to set the theme to be used. If `true`, uses dark theme; if `false`, uses light theme
 * @param {(theme: string) => void} saveTheme - callback that receives a theme to save it locally in the user's session
 * @returns {ActionsCreators} the `type` of this action, and a `payload` containing the same parameter value
 */

export const setTheme = (
  theme: boolean,
  saveTheme?: (theme: boolean) => void
): ActionsCreators => {
  if (saveTheme) {
    saveTheme(theme)
  }

  return {
    type: 'SET_THEME',
    payload: {
      theme
    }
  }
}

export default Theme
