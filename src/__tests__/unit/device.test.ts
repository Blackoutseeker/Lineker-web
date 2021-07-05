import isMobileDevice from '@services/device'

describe('Testing "isMobileDevice" method in "device" module. The goal is to get the user\'s device type', () => {
  test('Should return "true" if user agent specifies a mobile device', () => {
    const mobileUserAgentExample =
      'Mozilla/5.0 (Linux; Android 6.0.1; Moto G (4)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Mobile Safari/537.36'
    const isMobile = isMobileDevice(mobileUserAgentExample)
    expect(isMobile).toBeTruthy()
  })

  test('Should return "false" if user agent doesn\'t specify a mobile device', () => {
    const desktopUserAgentExample =
      'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36'
    const isMobile = isMobileDevice(desktopUserAgentExample)
    expect(isMobile).toBeFalsy()
  })

  test('Should return "false" if user agent is undefined', () => {
    const isMobile = isMobileDevice(undefined)
    expect(isMobile).toBeFalsy()
  })
})
