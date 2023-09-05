describe('test login page', () => {
  it('display input errors', () => {
    cy.visit('/');
    cy.get('[data-cy="username-input"]').type('te');

    cy.get('body').should('contain', 'Username should be at least 3 characters');

    cy.get('[data-cy="password-input"]').type('part');

    cy.get('body').should('contain', 'Password should be at least 8 characters');
  });
  it('unsuccessful login', () => {
    cy.visit('/');
    cy.get('[data-cy="username-input"]').type('tesonet');

    cy.get('[data-cy="password-input"]').type('partyalasfafaw{enter}');

    cy.get('body').should('contain', 'Wrong username or/and password!');
  });
  it('successful login', () => {
    cy.visit('/');
    cy.get('[data-cy="username-input"]').type('tesonet');

    cy.get('[data-cy="password-input"]').type('partyanimal{enter}');

    cy.url().should('include', '/servers');
  });
});
