import load from '@services/load'

describe('Testing "loadTheme" method from "load" module', () => {
  const DARK_THEME = true
  const LIGHT_THEME = false

  const simulateGettingThemeByCookie = (
    themeLoadedByCookie: string | undefined
  ) => () => themeLoadedByCookie

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

describe('Testing "loadToken" method from "load" module', () => {
  const simulateGettingTokenByCookie = (
    tokenLoadedByCookie: string | undefined
  ) => () => tokenLoadedByCookie

  const getTokenLoaded = (TokenToBeLoaded: string | undefined): string => {
    const getTokenByCookie = simulateGettingTokenByCookie(TokenToBeLoaded)
    const tokenLoaded = load().loadToken(getTokenByCookie)
    return tokenLoaded
  }

  test('Should return the same parameter if the token is a valid JWT', () => {
    const token = '0mf92Nhaf7uP02nBgsoXCJ3Mqw77yu56'
    const tokenLoaded = getTokenLoaded(token)
    expect(tokenLoaded).toEqual(token)
  })

  test('Should return blank text if it is not possible to load the token from Cookies', () => {
    const tokenLoaded = getTokenLoaded(undefined)
    expect(tokenLoaded).toEqual('')
  })
})
