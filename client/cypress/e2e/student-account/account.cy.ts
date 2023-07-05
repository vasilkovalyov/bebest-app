import { slowCypressDown } from 'cypress-slow-down'

slowCypressDown(200)

describe('Student account spec', () => {
  it('login student', () => {
    cy.visit('http://localhost:3000/login')
    cy.get('[data-cy="email"]').type('vasilkovalyov@gmail.com')
    cy.get('[data-cy="password"]').type('Kovalyov1994$')
    cy.get('[data-cy="submit-login').contains('Sign in').click()
  })

  after('click on edit form button', () => {
    cy.get('[data-cy="button-open-edit-account-form"]').click()
  })

  after('update student account form', () => {
    cy.get('[data-cy="phone"]').clear()
    cy.get('[data-cy="phone"]').type('380954498333')
    cy.get('[data-cy="about"]').clear()
    cy.get('[data-cy="about"]').type(
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quidem quos alias, distinctio laudantium voluptatibus ratione?'
    )
    cy.get('[data-cy="submit-save-user-account"]').click()
  })

  after('update student education form', () => {
    cy.get('[data-cy="button-open-edit-subject-form"]').click()
    cy.get('[data-cy="button-add-subject"]').click()
    cy.get('[data-cy="subjects-0-subject_study"]').type('Subject 1')
    cy.get('[data-cy="subjects-0-level_mastery_subject"]').type('Level 1')
    cy.get('[data-cy="button-add-subject"]').click()
    cy.get('[data-cy="button-open-edit-subject-form"]').click()
    cy.get('[data-cy="button-open-edit-subject-form"]').click()
    cy.get('[data-cy="button-remove-subject-0"]').click()
    cy.get('[data-cy="button-accept-remove-subject"]')
      .contains('accept')
      .click()
    cy.get('[data-cy="button-open-edit-subject-form"]').click()
  })

  after('logout from account', () => {
    cy.get('button[aria-label="Open menu"]').click()
    cy.get('button').contains('Log out').click()
  })
})
