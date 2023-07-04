describe('Company registration spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/registration')
    cy.get('[data-cy="company-tab"]').click()
    cy.get('[data-cy="company_name"]').type('Test company')
    cy.get('[data-cy="admin_name"]').type('Kovalyov')
    cy.get('[data-cy="admin_surname"]').type('Kovalyov')
    cy.get('[data-cy="email"]').type('vasilkovalyov@gmail.com')
    cy.get('[data-cy="password"]').type('Kovalyov1994$')
    cy.get('[data-cy="confirm_password"]').type('Kovalyov1994$')
    cy.get('[data-cy="submit-registration"]').click()
  })
})
