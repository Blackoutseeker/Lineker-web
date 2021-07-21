describe('Testing sign out system', () => {
  // pages
  const loginPageUrl = 'http://localhost:3000/login'
  const homePageUrl = 'http://localhost:3000/'

  // global variables
  const realUserEmail: string = Cypress.env('email')
  const realUserPassword: string = Cypress.env('password')

  // DOM elements
  const emailInput = () => cy.getElementByDataCy('email-input')
  const passwordInput = () => cy.getElementByDataCy('password-input')
  const signOutButton = () => cy.getElementByDataCy('signout-button')

  const fillFormAndLogin = (email: string, password: string) => {
    emailInput().type(email)
    passwordInput().type(`${password}{enter}`)
  }

  it('Should sign out and redirect the user to the home page', () => {
    cy.visit(loginPageUrl)
    fillFormAndLogin(realUserEmail, realUserPassword)

    signOutButton().click()
    cy.url().should('equal', homePageUrl)
  })
})
