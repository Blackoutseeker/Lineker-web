interface LoadByCookies {
  /**
   * Load the theme by Cookies
   * @param {() => string | undefined} getThemeByCookie - a callback that gets the theme by Cookies and returns it as a string
   * @returns {boolean} the theme loaded by Cookies
   */
  loadTheme: (getThemeByCookie: () => string | undefined) => boolean

  /**
   * Load the user's token by Cookies
   * @param {() => string | undefined} getTokenByCookie - a callback that gets the user's token by Cookies and returns it
   * @returns {string} the user's token loaded by Cookies
   */
  loadToken: (getTokenByCookie: () => string | undefined) => string
}

/**
 * Load stored values by Cookies to init the user's page
 * @method `loadTheme` - Load the theme by Cookies
 * @method `loadToken` - Load the user's token by Cookies
 */
export default function load(): LoadByCookies {
  return {
    loadTheme: (getThemeByCookie: () => string | undefined): boolean => {
      const themeLoaded = getThemeByCookie() === 'true' ?? false
      return themeLoaded
    },
    loadToken: (getTokenByCookie: () => string | undefined): string => {
      const tokenLoaded = getTokenByCookie() ?? ''
      return tokenLoaded
    }
  }
}
