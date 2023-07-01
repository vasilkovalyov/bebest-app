describe('Login spec', () => {
  it('login', () => {
    // go to the login page
    cy.visit('http://localhost:3000/login');
    // add email
    cy.get('#email').type('vasilkovalyov@gmail.com');
    // add password
    cy.get('#password').type('Kovalyov1994$');
    // submit form
    cy.get('button').contains('Sign in').click();
  });
});
