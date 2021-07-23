/**
 * Check the user's device type
 * @param {string | undefined} userAgent user agent of a request header
 * @returns {boolean} `true` if the user is using a mobile device; otherwise, returns `false`
 */

export default function isMobileDevice(userAgent: string | undefined): boolean {
  const mobileDeviceIdentifiers: RegExp = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i

  if (userAgent && mobileDeviceIdentifiers.test(userAgent)) {
    return true
  }
  return false
}
