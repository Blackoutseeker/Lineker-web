describe('Testing the "Link" component and its actions', () => {
  // pages
  const loginPageUrl = 'http://localhost:3000/login'

  // global variables
  const realUserEmail: string = Cypress.env('email')
  const realUserPassword: string = Cypress.env('password')

  // DOM elements
  const emailInput = () => cy.getElementByDataCy('email-input')
  const passwordInput = () => cy.getElementByDataCy('password-input')
  const floatingActionButton = () =>
    cy.getElementByDataCy('floating-action-button')
  const titleInput = () => cy.getElementByDataCy('title-input')
  const urlInput = () => cy.getElementByDataCy('url-input')
  const copyButton = (title: string) => cy.getElementByDataCy(`copy-${title}`)
  const deleteButton = (title: string) =>
    cy.getElementByDataCy(`delete-${title}`)
  const confirmButton = () => cy.getElementByDataCy('confirm-button')

  const fillFormAndLogin = (email: string, password: string) => {
    emailInput().type(email)
    passwordInput().type(`${password}{enter}`)
  }

  // actions
  const createNewLink = (title: string, url: string) => {
    floatingActionButton().click()
    titleInput().type(title)
    urlInput().type(`${url}{enter}`)
  }

  const copyToClipboard = async (title: string, url: string) => {
    copyButton(title).click()
    cy.task('getTextFromClipboard').should('equal', url)
  }

  const deleteLink = (title: string) => {
    deleteButton(title).click()
    confirmButton().click()
  }

  it('Should create a new link, copy its url to clipboard and delete it', () => {
    cy.visit(loginPageUrl)
    fillFormAndLogin(realUserEmail, realUserPassword)

    const title = 'Flutter'
    const url = 'https://flutter.dev'

    createNewLink(title, url)
    copyToClipboard(title, url)
    deleteLink(title)
  })
})
