import nookies from 'nookies'
import load from '@services/load'

describe('Testing the integration of the "loadTheme" from "load" module with the "nookies" package', () => {
  const DARK_THEME = true
  const LIGHT_THEME = false

  const stringifyTheme = (themeToBeStringified: boolean) =>
    String(themeToBeStringified)

  const getThemeLoaded = (themeToBeLoaded: boolean): boolean => {
    nookies.set(undefined, 'theme', stringifyTheme(themeToBeLoaded))
    const getThemeByCookies = (): string | undefined =>
      nookies.get(undefined).theme
    const themeLoaded = load().loadTheme(getThemeByCookies)
    return themeLoaded
  }

  // clear "theme" cookie before each test
  beforeEach(() => {
    nookies.destroy(undefined, 'theme')
  })

  test('Should use dark theme if nookies loads dark theme', () => {
    const themeLoaded = getThemeLoaded(DARK_THEME)
    expect(themeLoaded).toEqual(DARK_THEME)
  })

  test('Should use light theme if nookies loads light theme', () => {
    const themeLoaded = getThemeLoaded(LIGHT_THEME)
    expect(themeLoaded).toEqual(LIGHT_THEME)
  })

  test("Should use light theme if nookies didn't load a theme (returned undefined)", () => {
    const getThemeByCookies = (): string | undefined =>
      nookies.get(undefined).theme
    const themeLoaded = load().loadTheme(getThemeByCookies)
    expect(themeLoaded).toEqual(LIGHT_THEME)
  })
})

describe('Testing the integration of the "loadToken" from "load" module with the "nookies" package', () => {
  const TOKEN = 'Nyv7j8h3nzldgJG7uP02nBgsoXCJ3M9y3nVCCpaW'

  // clear "token" cookie before each test
  beforeEach(() => {
    nookies.destroy(undefined, 'token')
  })

  test('Should load a valid JWT if nookies loads the token', () => {
    nookies.set(undefined, 'token', TOKEN)

    const getTokenByCookies = (): string | undefined =>
      nookies.get(undefined).token
    const tokenLoaded = load().loadToken(getTokenByCookies)

    expect(tokenLoaded).toEqual(TOKEN)
  })

  test("Should return blank text if nookies didn't load a token", () => {
    const getTokenByCookies = (): string | undefined =>
      nookies.get(undefined).token
    const tokenLoaded = load().loadToken(getTokenByCookies)
    expect(tokenLoaded).toBe('')
  })
})
