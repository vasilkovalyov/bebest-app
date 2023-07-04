describe('Teacher registration spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/registration')
    cy.get('[data-cy="teacher-tab"]').click()
    cy.get('[data-cy="name"]').type('Vasiliy')
    cy.get('[data-cy="surname"]').type('Kovalyov')
    cy.get('[data-cy="email"]').type('vasilkovalyov@gmail.com')
    cy.get('[data-cy="password"]').type('Kovalyov1994$')
    cy.get('[data-cy="confirm_password"]').type('Kovalyov1994$')
    cy.get('[data-cy="submit-registration"]').click()
  })
})
