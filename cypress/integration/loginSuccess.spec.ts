describe('Testing login for success', () => {
  // pages
  const loginPageUrl = 'http://localhost:3000/login'
  const usersPageUrl = 'http://localhost:3000/users/'

  // global variables
  const realUserEmail: string = Cypress.env('email')
  const realUserPassword: string = Cypress.env('password')
  const realUserId: string = Cypress.env('uid')

  // DOM elements
  const emailInput = () => cy.getElementByDataCy('email-input')
  const passwordInput = () => cy.getElementByDataCy('password-input')

  const fillFormAndLogin = (email: string, password: string) => {
    emailInput().type(email)
    passwordInput().type(`${password}{enter}`)
  }

  it('Should redirect user from login page to user page', () => {
    cy.clearLocalStorage()
    cy.clearCookies()
    cy.visit(loginPageUrl)

    const uniquePageGeneratedForUser =
      usersPageUrl + realUserId + '?currentFilter=Default'

    fillFormAndLogin(realUserEmail, realUserPassword)
    cy.url().should('equal', uniquePageGeneratedForUser)
  })
})
