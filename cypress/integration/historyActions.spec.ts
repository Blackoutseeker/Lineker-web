describe('Testing the History feature and its actions', () => {
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
  const deleteLinkButton = (title: string) =>
    cy.getElementByDataCy(`delete-${title}`)
  const confirmButton = () => cy.getElementByDataCy('confirm-button')
  const historyButton = () => cy.getElementByDataCy('history-button')
  const historyItem = (title: string) =>
    cy.getElementByDataCy(`history-item-${title}`)
  const historyItemDeleteButton = (title: string) =>
    cy.getElementByDataCy(`history-item-delete-button-${title}`)
  const deleteAllHistoryButton = () =>
    cy.getElementByDataCy('delete-all-history-button')

  const generateRandomId = (length: number = 6): string => {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''

    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return result
  }

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

  const deleteAllLinks = (deleteButtons: Cypress.Chainable<Element>[]) => {
    deleteButtons.forEach(button => {
      button.click({ force: true })
      confirmButton().click({ force: true })
    })
  }

  const checkIfHistoryItemExists = (
    historyItems: Cypress.Chainable<Element>[]
  ) => {
    historyItems.forEach(historyItem => {
      historyItem.should('exist')
    })
  }

  const deleteHistoryItem = (
    title: string,
    historyItem: Cypress.Chainable<Element>
  ) => {
    historyItemDeleteButton(title).click({ multiple: true })
    historyItem.should('not.exist')
  }

  const deleteAllHistory = (historyItems: Cypress.Chainable<Element>[]) => {
    deleteAllHistoryButton().click()
    historyItems.forEach(historyItem => {
      historyItem.should('not.exist')
    })
  }

  it('Should create a new link, copy its url to clipboard and delete it', () => {
    cy.visit(loginPageUrl)
    fillFormAndLogin(realUserEmail, realUserPassword)

    const randomId1 = generateRandomId()
    const randomId2 = generateRandomId()
    const randomId3 = generateRandomId()

    const title1 = `Flutter_${randomId1}`
    const url1 = 'https://flutter.dev'
    const title2 = `React_${randomId2}`
    const url2 = 'https://reactjs.org'
    const title3 = `Python_${randomId3}`
    const url3 = 'https://www.python.org'

    createNewLink(title1, url1)
    createNewLink(title2, url2)
    createNewLink(title3, url3)

    const deleteButtons: Cypress.Chainable<Element>[] = [
      deleteLinkButton(title1),
      deleteLinkButton(title2),
      deleteLinkButton(title3)
    ]

    deleteAllLinks(deleteButtons)
    historyButton().click()

    const historyItems: Cypress.Chainable<Element>[] = [
      historyItem(title1),
      historyItem(title2),
      historyItem(title3)
    ]

    checkIfHistoryItemExists(historyItems)
    deleteHistoryItem(title1, historyItem(title1))
    deleteAllHistory(historyItems)
  })
})
