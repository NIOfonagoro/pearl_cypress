const { QA_CONNECTED_RISK_ENGINE_URL } = require('../../../config.js');

describe('Login/Logout Test', () => {
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
        cy.get('.alert alert-error').should('be.visible');
    })

    it.skip('should log into the application', () => {
        cy.fixture('users/externalAdminUser').then(user => {
            const username = user.username;
            const password = user.password;

            cy.get('#username').clear().type(username);
            cy.get('#password').clear().type(password);
            cy.get('#kc-login').click();
        })

        cy.get('.jss145').should('be.visible');
        cy.url().should('include', '/main/dashboard');
    })

})
