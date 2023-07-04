describe('Login spec', () => {
  it('login', () => {
    cy.visit('http://localhost:3000/login')
    cy.get('[data-cy="email"]').type('vasilkovalyov@gmail.com')
    cy.get('[data-cy="password"]').type('Kovalyov1994$')
    cy.get('[data-cy="submit-login').contains('Sign in').click()
  })
})
