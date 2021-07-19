import Theme, { setTheme } from '@store/ducks/theme'

describe('Testing actions creators and reducer from "Theme" module', () => {
  const DARK_THEME = true
  const LIGHT_THEME = false
  const themeExample = true

  const setAndGetThemeFromReducer = (themeToBeSetted: boolean): boolean =>
    Theme(themeExample, setTheme(themeToBeSetted))

  test('"setTheme" action type should be "SET_THEME"', () => {
    const { type } = setTheme(themeExample)
    expect(type).toEqual('SET_THEME')
  })

  test('"setTheme" payload should returns the same parameter value', () => {
    const { payload } = setTheme(themeExample)
    expect(payload.theme).toEqual(themeExample)
  })

  test('Should use dark theme if reducer returns "true"', () => {
    expect(setAndGetThemeFromReducer(DARK_THEME)).toEqual(DARK_THEME)
  })

  test('Should use light theme if reducer returns "false"', () => {
    expect(setAndGetThemeFromReducer(LIGHT_THEME)).toEqual(LIGHT_THEME)
  })
})
