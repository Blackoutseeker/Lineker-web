describe('Testing mobile device redirection', () => {
  // pages
  const homePageUrl = 'http://localhost:3000/'
  const loginPageUrl = 'http://localhost:3000/login'
  const historyPageUrl = 'http://localhost:3000/history'

  const mobileUserAgentExample =
    'Mozilla/5.0 (Linux; Android 6.0.1; Moto G (4)) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Mobile Safari/537.36'

  it("Should redirect to home page if user's accessing login page and using a mobile device", () => {
    cy.visit(loginPageUrl, {
      headers: {
        'user-agent': mobileUserAgentExample
      }
    })
    cy.url().should('equal', homePageUrl)
  })

  it("Should redirect to home page if user's accessing history page and using a mobile device", () => {
    cy.visit(historyPageUrl, {
      headers: {
        'user-agent': mobileUserAgentExample
      }
    })
    cy.url().should('equal', homePageUrl)
  })
})
