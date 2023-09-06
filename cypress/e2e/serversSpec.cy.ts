import { ascendingSort, descendingSort } from '../../src/helpers/sorting';

describe('test servers page', () => {
  it('should redirect to login, if not logged in', () => {
    cy.visit('/servers');

    cy.get('body').should('contain', 'Login');
  });
  it('should logout on logout click', () => {
    cy.login();

    cy.get('[data-cy="logout"]').click();

    cy.get('body').should('contain', 'Login');
  });
  it('should display servers list', () => {
    cy.login();

    cy.url().should('include', '/servers');

    cy.get('[data-cy="servers-list"]').should('be.visible');
    cy.get('[data-cy="sort-by-name"]').should('be.visible');
    cy.get('[data-cy="sort-by-distance"]').should('be.visible');

    cy.get('[data-cy="server-item"]').then((servers) => {
      cy.get('[data-cy="server-item"]').should('have.length', servers.length);
    });
  });
  it('should sort by name', () => {
    cy.login();

    cy.get('[data-cy="sort-by-name"]').click();

    cy.get('[data-cy="server-name"]')
      .then((serverNames) => Cypress._.map(serverNames, (el) => el.innerText))
      .should('be.an', 'array')
      .then((names) => {
        const sorted = names.sort((a, b) => ascendingSort(a, b));
        expect(sorted).to.deep.equal(names);
      });

    cy.get('[data-cy="sort-by-name"]').click();

    cy.get('[data-cy="server-name"]')
      .then((serverNames) => Cypress._.map(serverNames, (el) => el.innerText))
      .should('be.an', 'array')
      .then((names) => {
        const sorted = names.sort((a, b) => descendingSort(a, b));
        expect(sorted).to.deep.equal(names);
      });
  });
  it('should sort by distance', async () => {
    cy.login();

    cy.get('[data-cy="sort-by-distance"]').click();
    cy.get('[data-cy="server-distance"]')
      .then((serverDistances) => Cypress._.map(serverDistances, (el) => el.innerText))
      .should('be.an', 'array')
      .then((distances) => {
        const sorted = distances.sort((a, b) => ascendingSort(+a, +b)).map((distance) => `${distance}`);
        expect(sorted).to.deep.equal(distances);
      });

    cy.get('[data-cy="sort-by-distance"]').click();

    cy.get('[data-cy="server-distance"]')
      .then((serverDistances) => Cypress._.map(serverDistances, (el) => el.innerText))
      .should('be.an', 'array')
      .then((distances) => {
        const sorted = distances.sort((a, b) => descendingSort(+a, +b)).map((distance) => `${distance}`);
        expect(sorted).to.deep.equal(distances);
      });
  });
});
