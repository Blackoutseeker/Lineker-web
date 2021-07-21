describe('Testing filter creation', () => {
  // pages
  const loginPageUrl = 'http://localhost:3000/login'

  // global variables
  const realUserEmail: string = Cypress.env('email')
  const realUserPassword: string = Cypress.env('password')

  // DOM elements
  const emailInput = () => cy.getElementByDataCy('email-input')
  const passwordInput = () => cy.getElementByDataCy('password-input')
  const drawerButton = () => cy.getElementByDataCy('drawer-button')
  const addFilterInput = () => cy.getElementByDataCy('add-filter-input')

  const fillFormAndLogin = (email: string, password: string) => {
    emailInput().type(email)
    passwordInput().type(`${password}{enter}`)
  }

  it('Should create a new filter and set it as current filter', () => {
    cy.visit(loginPageUrl)
    fillFormAndLogin(realUserEmail, realUserPassword)

    const newFilter = 'NodeJS'
    drawerButton().click()
    addFilterInput().type(`${newFilter}{enter}`)

    cy.url().should('contain', `currentFilter=${newFilter}`)
  })
})
