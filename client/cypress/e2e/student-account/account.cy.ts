import { expect } from 'chai';
import { slowCypressDown } from 'cypress-slow-down';

slowCypressDown(200);

describe('Student account spec', () => {
  it('login student', () => {
    // go to the login page
    cy.visit('http://localhost:3000/login');
    // add email
    cy.get('#email').type('vasilkovalyov@gmail.com');
    // add password
    cy.get('#password').type('Kovalyov1994$');
    // submit form
    cy.get('button').contains('Sign in').click();
  });

  after('click on edit form button', () => {
    cy.get('button[aria-label="button-open-edit-account-form"]').click();
  });

  after('update student account form', () => {
    // clear phone field
    cy.get('#phone').clear();
    // fill phone field
    cy.get('#phone').type('380954498333');
    // clear about field
    cy.get('#about').clear();
    // fill about field
    cy.get('#about').type(
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quidem quos alias, distinctio laudantium voluptatibus ratione?'
    );
    // submit form
    cy.get('button').contains('Save').click();
  });

  after('update student education form', () => {
    // open edit form
    cy.get('button[aria-label="button-open-edit-subject-form"]').click();
    // click on add form
    cy.get('#button-add-subject').click();
    // // fill subject
    cy.get('#subjects-0-subject_study').type('Subject 1');
    // // fill level
    cy.get('#subjects-0-level_mastery_subject').type('Level 1');
    // // submit form
    cy.get('button').contains('Add one more subject').click();
    // close edit form
    cy.get('button[aria-label="button-open-edit-subject-form"]').click();
    // open again
    cy.get('button[aria-label="button-open-edit-subject-form"]').click();
    // click on remove subject button
    cy.get('#button-remove-subject-0').click();
    cy.get('button').contains('accept').click();
    cy.get('button[aria-label="button-open-edit-subject-form"]').click();
  });

  after('logout from account', () => {
    cy.get('button[aria-label="Open menu"]').click();
    cy.get('button').contains('Log out').click();
  });
});

// aria-label="button-open-edit-account-form"
// aria-label="button-remove-account"
