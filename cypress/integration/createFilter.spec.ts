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

  it('Should create a new filter and set it as current filter', () => {
    cy.visit(loginPageUrl)

    emailInput().type(realUserEmail)
    passwordInput().type(`${realUserPassword}{enter}`)

    const newFilter = 'NodeJS'
    drawerButton().click()
    addFilterInput().type(`${newFilter}{enter}`)

    cy.url().should('contain', `currentFilter=${newFilter}`)
  })
})
