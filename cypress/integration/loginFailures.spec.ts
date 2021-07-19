describe('Testing login for failures', () => {
  // pages
  const loginPageUrl = 'http://localhost:3000/login'

  // global variables
  const realUserEmail: string = Cypress.env('email')
  const unstoredEmail = 'email@example.com'

  // DOM elements
  const emailInput = () => cy.getElementByDataCy('email-input')
  const passwordInput = () => cy.getElementByDataCy('password-input')
  const loginButton = () => cy.getElementByDataCy('login-button')
  const messageBox = () => cy.getElementByDataCy('message-box')
  const forgotPasswordButton = () =>
    cy.getElementByDataCy('forgot-password-button')

  enum MessageBoxBackgroundColors {
    ERROR = 'rgb(204, 0, 0)',
    PASSWORD = 'rgb(10, 128, 187)'
  }

  const checkMessageBox = (backgroundColor: MessageBoxBackgroundColors) => {
    messageBox()
      .should('be.visible')
      .and('have.css', 'background-color', backgroundColor)
  }

  const fillFormAndLogin = (email: string, password: string) => {
    emailInput().type(email)
    passwordInput().type(password)
    loginButton().click()
  }

  const requestPasswordReset = (email: string) => {
    emailInput().type(email)
    forgotPasswordButton().click()
  }

  it("Should show an error message when the user doesn't have an account and tries to sign in", () => {
    cy.clearLocalStorage()
    cy.clearCookies()
    cy.visit(loginPageUrl)

    const unstoredPassword = 'uh... password?'

    fillFormAndLogin(unstoredEmail, unstoredPassword)
    checkMessageBox(MessageBoxBackgroundColors.ERROR)
  })

  it("Should show an error message when the user's password doesn't match your email", () => {
    cy.visit(loginPageUrl)

    const wrongUserPassword = 'this is a fake password'

    fillFormAndLogin(realUserEmail, wrongUserPassword)
    checkMessageBox(MessageBoxBackgroundColors.ERROR)
  })

  it("Should show an error message if the user doesn't have an account and tries to request a password reset", () => {
    cy.visit(loginPageUrl)
    requestPasswordReset(unstoredEmail)
    checkMessageBox(MessageBoxBackgroundColors.ERROR)
  })

  it('Should show a confirmation to the user if he has requested a password reset', () => {
    cy.visit(loginPageUrl)
    requestPasswordReset(realUserEmail)
    checkMessageBox(MessageBoxBackgroundColors.PASSWORD)
  })
})
