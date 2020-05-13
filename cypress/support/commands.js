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

import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command'

addMatchImageSnapshotCommand();

Cypress.Commands.add('isVisible', selector => {
    cy.get(selector).should('be.visible');
})

Cypress.Commands.add('isHidden', selector => {
    cy.get(selector).should('not.be.visible');
})

Cypress.Commands.add('login', (username, password) => {
    cy.get('#kc-form-login').should('be.visible').click();
    cy.get('#username').clear().type(username);
    cy.get('#password').clear().type(password);
    cy.get('#kc-login').click();
});