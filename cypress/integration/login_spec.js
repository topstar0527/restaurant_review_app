/// <reference types="Cypress" />

context('Startup', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should fill login form and redirect to homepage', () => {
   
    // Fill the username
    cy.get('input[name="username"]')
      .type('jasonjackson')
      .should('have.value', 'jasonjackson');

    // Fill the password
    cy.get('input[name="password"]')
      .type('123123')
      .should('have.value', '123123');

    // Locate and submit the form
    cy.get('form').submit();
   
  });
  
});