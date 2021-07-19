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

  const fillForm = () => {
    cy.visit(loginPageUrl)
    emailInput().type(realUserEmail)
    passwordInput().type(`${realUserPassword}{enter}`)
  }

  it('Should sign out and redirect the user to the home page', () => {
    fillForm()
    signOutButton().click()
    cy.url().should('equal', homePageUrl)
  })
})
