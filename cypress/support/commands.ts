declare namespace Cypress {
  interface Chainable {
    /**
     * Get DOM element by data-cy attribute.
     * It's recommended to use it when you want to get a specific element
     * @param {string} dataCy - value to get DOM element by data-cy attribute
     * @example
     *    cy.getElementByDataCy('login-button').should('be.enabled')
     */
    getElementByDataCy(dataCy: string): Chainable<Element>
  }
}

Cypress.Commands.add('getElementByDataCy', value => {
  return cy.get(`[data-cy=${value}]`)
})
