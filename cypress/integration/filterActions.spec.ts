describe('Testing filter creation', () => {
  // pages
  const loginPageUrl = 'http://localhost:3000/login'

  // global variables
  const realUserEmail: string = Cypress.env('email')
  const realUserPassword: string = Cypress.env('password')
  const newFilter = 'NodeJS'
  const defaultFilter = 'Default'

  // DOM elements
  const emailInput = () => cy.getElementByDataCy('email-input')
  const passwordInput = () => cy.getElementByDataCy('password-input')
  const drawerButton = () => cy.getElementByDataCy('drawer-button')
  const addFilterInput = () => cy.getElementByDataCy('add-filter-input')
  const filterButton = () => cy.getElementByDataCy(`filter-button-${newFilter}`)
  const deleteFilterButton = () =>
    cy.getElementByDataCy(`delete-filter-button-${newFilter}`)

  const fillFormAndLogin = (email: string, password: string) => {
    emailInput().type(email)
    passwordInput().type(`${password}{enter}`)
  }

  beforeEach(() => {
    cy.visit(loginPageUrl)
    fillFormAndLogin(realUserEmail, realUserPassword)
    drawerButton().click()
  })

  it('Should create a new filter and set it as current filter', () => {
    addFilterInput().type(`${newFilter}{enter}`)
    filterButton().should('be.visible')
    cy.url().should('contain', `currentFilter=${newFilter}`)
  })

  it('Should delete current filter correctly and set "Default" as current filter', () => {
    filterButton().click()
    drawerButton().click()
    deleteFilterButton().click()
    filterButton().should('not.exist')
    cy.url().should('contain', `currentFilter=${defaultFilter}`)
  })
})
