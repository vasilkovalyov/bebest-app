describe('Company registration spec', () => {
  it('passes', () => {
    // go to the registration page
    cy.visit('http://localhost:3000/registration');
    // choose student registration
    cy.get('button').contains('Company').click();
    // add company name
    cy.get('#company_name').type('Test company');
    // add admin name
    cy.get('#admin_name').type('Kovalyov');
    // add admin surname
    cy.get('#admin_surname').type('Kovalyov');
    // add email
    cy.get('#email').type('vasilkovalyov@gmail.com');
    // add password
    cy.get('#password').type('Kovalyov1994$');
    // add confirm_password
    cy.get('#confirm_password').type('Kovalyov1994$');

    // submit form
    cy.get('button').contains('Registration').click();
  });
});
