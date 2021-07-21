import load from '@services/load'

describe('Testing "loadTheme" method from "load" module', () => {
  const DARK_THEME = true
  const LIGHT_THEME = false

  const simulateGettingThemeByCookie =
    (themeLoadedByCookie: string | undefined) => () =>
      themeLoadedByCookie

  const stringifyTheme = (themeToBeStringified: boolean): string =>
    String(themeToBeStringified)

  const getThemeLoaded = (themeToBeLoaded: boolean): boolean => {
    const getThemeByCookie = simulateGettingThemeByCookie(
      stringifyTheme(themeToBeLoaded)
    )
    const themeLoaded = load().loadTheme(getThemeByCookie)
    return themeLoaded
  }

  test('Should use dark theme if "loadTheme" returns "true"', () => {
    const themeLoaded = getThemeLoaded(DARK_THEME)
    expect(themeLoaded).toEqual(DARK_THEME)
  })

  test('Should use light theme if "loadTheme" returns "false"', () => {
    const themeLoaded = getThemeLoaded(LIGHT_THEME)
    expect(themeLoaded).toEqual(LIGHT_THEME)
  })

  test('Should use light theme if "getThemeByCookie" callback from "loadTheme" method returns "undefined"', () => {
    const getThemeByCookie = simulateGettingThemeByCookie(undefined)
    const themeLoaded = load().loadTheme(getThemeByCookie)
    expect(themeLoaded).toEqual(LIGHT_THEME)
  })
})
