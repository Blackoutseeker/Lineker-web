describe('Testing theme change on user page', () => {
  // pages
  const loginPageUrl = 'http://localhost:3000/login'

  // global variables
  const realUserEmail: string = Cypress.env('email')
  const realUserPassword: string = Cypress.env('password')

  // DOM elements
  const emailInput = () => cy.getElementByDataCy('email-input')
  const passwordInput = () => cy.getElementByDataCy('password-input')
  const body = () => cy.get('body')
  const switchButton = () => cy.getElementByDataCy('switch-button')

  enum ThemeBackgroundColors {
    DARK = 'rgb(18, 18, 18)',
    LIGHT = 'rgb(0, 88, 132)'
  }

  const fillFormAndLogin = (email: string, password: string) => {
    emailInput().type(email)
    passwordInput().type(`${password}{enter}`)
  }

  const checkBodyBackgroundColor = (
    themeBackgroundColor: ThemeBackgroundColors
  ) => {
    body().should('have.css', 'background-color', themeBackgroundColor)
  }

  it("Should use light theme by default when user's logged in, and dark theme when the user click in the switch button", () => {
    cy.visit(loginPageUrl)

    fillFormAndLogin(realUserEmail, realUserPassword)

    checkBodyBackgroundColor(ThemeBackgroundColors.LIGHT)
    switchButton().click()
    checkBodyBackgroundColor(ThemeBackgroundColors.DARK)
  })
})
