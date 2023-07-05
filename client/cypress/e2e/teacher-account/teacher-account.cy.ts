import { slowCypressDown } from 'cypress-slow-down'
import dayjs from 'dayjs'
import dateFormat from '@/constants/date-forma'

slowCypressDown(200)

// const startDate = dayjs('2022-07-03').format(dateFormat.base)

describe('Teacher account spec', () => {
  it('login teacher', () => {
    cy.visit('http://localhost:3000/login')
    cy.get('[data-cy="email"]').type('vasilkovalyov1@gmail.com')
    cy.get('[data-cy="password"]').type('Kovalyov1994$')
    cy.get('[data-cy="submit-login').contains('Sign in').click()
  })

  after('click on edit form button', () => {
    cy.get('[data-cy="button-open-edit-account-form"]').click()
  })

  after('update teacher account form', () => {
    cy.get('[data-cy="phone"]').clear()
    cy.get('[data-cy="phone"]').type('380954498333')
    cy.get('[data-cy="about"]').clear()
    cy.get('[data-cy="about"]').type(
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quidem quos alias, distinctio laudantium voluptatibus ratione?'
    )
    cy.get('[data-cy="submit-save-user-account"]').click()
  })

  // after('add payment card', () => {
  //   cy.get('button[role="tab"]').contains('Bank data').click()
  //   cy.get('button[aria-label="button-open-modal-add-paymen-card"]')
  //     .contains('Add payment card')
  //     .click()
  //   cy.get('input#payment-card').type('5151515151515151')
  //   cy.get('button[aria-label="button-add-payment-card"]').click()
  // })

  // after('add payment card', () => {
  // cy.get('button[aria-label="button-open-edit-work-experience"]').click()
  // cy.get('button[aria-label="button-add-work-experience"]').click()
  // cy.get('#work_experience-0-company_name').type('Ukad')
  // cy.get('#work_experience-0-description').type(
  //   'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quidem quos alias, distinctio laudantium voluptatibus ratione?'
  // )
  // cy.get('#work_experience-0-startDate').type(startDate)
  // cy.get('#work_experience.0.isStillWorking').check()
  //tst
  // cy.get('#subjects-0-subject_study').type('Subject 1')
  // cy.get('#subjects-0-level_mastery_subject').type('Level 1')
  // cy.get('button').contains('Add one more subject').click()
  // cy.get('button[aria-label="button-open-edit-subject-form"]').click()
  // cy.get('button[aria-label="button-open-edit-subject-form"]').click()
  // cy.get('#button-remove-subject-0').click()
  // cy.get('button').contains('accept').click()
  // cy.get('button[aria-label="button-open-edit-subject-form"]').click()
  // })

  // after('logout from account', () => {
  //   cy.get('button[aria-label="Open menu"]').click()
  //   cy.get('button').contains('Log out').click()
  // })
})
