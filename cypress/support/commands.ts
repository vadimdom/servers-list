Cypress.Commands.add('login', () => {
  cy.visit('/');

  cy.get('[data-cy="username-input"]').type('tesonet');

  cy.get('[data-cy="password-input"]').type(`partyanimal{enter}`);

  cy.url().should('include', '/servers');
});
