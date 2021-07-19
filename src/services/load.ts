interface LoadByCookies {
  /**
   * Load the theme by Cookies
   * @param {() => string | undefined} getThemeByCookie - a callback that gets the theme by Cookies and returns it as a string
   * @returns {boolean} the theme loaded by Cookies
   */
  loadTheme: (getThemeByCookie: () => string | undefined) => boolean
}

/**
 * Load stored values by Cookies to init the user's page
 * @method `loadTheme` - Load the theme by Cookies
 */
export default function load(): LoadByCookies {
  return {
    loadTheme: (getThemeByCookie: () => string | undefined): boolean => {
      const themeLoaded = getThemeByCookie() === 'true' ?? false
      return themeLoaded
    }
  }
}
