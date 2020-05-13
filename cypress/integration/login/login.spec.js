const { QA_CONNECTED_RISK_ENGINE_URL } = require('../../../config.js');

describe('Unsuccessful Login', () => {
    before(function () {
        cy.visit(QA_CONNECTED_RISK_ENGINE_URL);
        cy.url().should('include', 'qa.pearl.pwc.com');
        cy.title().should('eq', 'Log in to Connected Risk Engine');
    })

    it('should try with invalid data', () => {
        cy.get('#kc-form-login').should('be.visible');
        cy.get('#username').clear().type('invalid username');
        cy.get('#password').clear().type('invalid password');
        cy.get('#kc-login').click();
    })

    it('should display error message', () => {
        cy.get('.kc-feedback-text').should('be.visible');
    })

})

describe('Successful Login & Logout', () => {
    before(function () {
        cy.visit(QA_CONNECTED_RISK_ENGINE_URL);
        cy.url().should('include', 'qa.pearl.pwc.com');
        cy.title().should('eq', 'Log in to Connected Risk Engine');
    })

    it('should log in and out into the application', () => {

        cy.fixture('users/externalAdminUser').then(user => {
            const username = user.username;
            const password = user.password;

            cy.login(username, password);
        })

        /* if (true == cy.isVisible('[class="sc-dnqmqq sc-hCbubC gLCWmd"]')) {
            cy.get('[alt="grey arrow right"]').eq(0).click
        } */

        cy.url().should('include', '/main/dashboard');
        cy.get('.jss145').should('be.visible');

        cy.get('[class="sc-ifAKCX hwgAZr"]').eq(2).click();
        cy.get('[role="menuitem"]').contains('Logout').click();
        cy.title().should('eq', 'Log in to Connected Risk Engine');
    })


})
