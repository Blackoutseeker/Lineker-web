describe('Testing login for success', () => {
  // pages
  const loginPageUrl = 'http://localhost:3000/login'
  const userPageUrl = 'http://localhost:3000/user?currentFilter=Default'

  // global variables
  const realUserEmail: string = Cypress.env('email')
  const realUserPassword: string = Cypress.env('password')

  // DOM elements
  const emailInput = () => cy.getElementByDataCy('email-input')
  const passwordInput = () => cy.getElementByDataCy('password-input')

  const fillFormAndLogin = (email: string, password: string) => {
    emailInput().type(email)
    passwordInput().type(`${password}{enter}`)
  }

  it('Should redirect user from login page to user page', () => {
    cy.visit(loginPageUrl)
    fillFormAndLogin(realUserEmail, realUserPassword)

    cy.url().should('equal', userPageUrl)
  })
})
