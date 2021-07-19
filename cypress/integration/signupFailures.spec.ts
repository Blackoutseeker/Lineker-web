describe('Testing sign up for failures', () => {
  // pages
  const loginPageUrl = 'http://127.0.0.1:3000/login' // Host 127.0.0.1 is used for reCAPTCHA to render correctly

  // DOM elements
  const emailInput = () => cy.getElementByDataCy('email-input')
  const passwordInput = () => cy.getElementByDataCy('password-input')
  const messageBox = () => cy.getElementByDataCy('message-box')
  const createAccountSwitch = () =>
    cy.getElementByDataCy('create-account-switch')

  const errorMessageBoxBackgroundColor = 'rgb(204, 0, 0)'

  const checkErrorMessageBox = () => {
    messageBox()
      .should('be.visible')
      .and('have.css', 'background-color', errorMessageBoxBackgroundColor)
  }

  it('Should show an error message if the user fills the form without confirming the reCAPTCHA and presses "Enter" key', () => {
    cy.visit(loginPageUrl)

    const emailExample = 'email@example.com'
    const passwordExample = 'I think it\'s "password" or 123'

    createAccountSwitch().click()
    emailInput().type(emailExample)
    passwordInput().type(`${passwordExample}{enter}`)
    checkErrorMessageBox()
  })
})
