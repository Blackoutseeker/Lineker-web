import nookies from 'nookies'
import load from '@services/load'
import { setTheme } from '@store/ducks/theme'

describe('Testing the integration of the "load" module and "setTheme" from "Theme" module, with the "nookies" package', () => {
  const DARK_THEME = true
  const LIGHT_THEME = false

  const stringifyTheme = (themeToBeStringified: boolean) =>
    String(themeToBeStringified)

  const setAndGetThemeLoaded = (themeToBeLoaded: boolean): boolean => {
    nookies.set(undefined, 'theme', stringifyTheme(themeToBeLoaded))
    const getThemeByCookies = (): string | undefined =>
      nookies.get(undefined).theme
    const loadedTheme = load().loadTheme(getThemeByCookies)
    const { payload } = setTheme(loadedTheme)
    return payload.theme
  }

  // clear "theme" cookie before each test
  beforeAll(() => {
    nookies.destroy(undefined, 'theme')
  })

  test('Should use dark theme if nookies loads dark theme, and set loaded theme via "loadTheme" and "setTheme" methods', () => {
    const currentTheme = setAndGetThemeLoaded(DARK_THEME)
    expect(currentTheme).toEqual(DARK_THEME)
  })

  test('Should use light theme if nookies loads light theme, and set loaded theme via "loadTheme" and "setTheme" methods', () => {
    const currentTheme = setAndGetThemeLoaded(LIGHT_THEME)
    expect(currentTheme).toEqual(LIGHT_THEME)
  })

  test('Should use light theme if nookies didn\'t load a theme (returned undefined), and set light theme via "loadTheme" and "setTheme" methods', () => {
    const getThemeByCookies = (): string | undefined =>
      nookies.get(undefined).theme
    const loadedTheme = load().loadTheme(getThemeByCookies)
    const { payload } = setTheme(loadedTheme)
    expect(payload.theme).toEqual(LIGHT_THEME)
  })
})
