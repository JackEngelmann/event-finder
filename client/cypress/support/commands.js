import 'cypress-file-upload'

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('login', () => {
  cy.visit('http://localhost:3000/#/admin')
  cy.contains('Auswahl akzeptieren').click()
  cy.get('[data-cy=login-username-input]').type('admin')
  cy.get('[data-cy=login-password-input]').type('alexfalcojack')
  cy.get('[data-cy=login-submit-button]').click()
  cy.url().should('include', 'admin')
})

Cypress.Commands.add('acceptCookies', () => {
  cy.setCookie('cookie-banner-shown', 'true')
})
