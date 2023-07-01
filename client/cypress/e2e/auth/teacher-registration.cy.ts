describe('Teacher registration spec', () => {
  it('passes', () => {
    // go to the registration page
    cy.visit('http://localhost:3000/registration');
    // choose student registration
    cy.get('button').contains('Teacher').click();
    // add name
    cy.get('#name').type('Vasiliy');
    // add surname
    cy.get('#surname').type('Kovalyov');
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
