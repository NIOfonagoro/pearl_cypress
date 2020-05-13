const { QA_CONNECTED_RISK_ENGINE_URL } = require('../../../config.js');

describe('Create Campaign', () => {
    before(function () {
        cy.visit(QA_CONNECTED_RISK_ENGINE_URL);
        cy.url().should('include', 'qa.pearl.pwc.com');
        cy.title().should('eq', 'Log in to Connected Risk Engine');

        cy.fixture('users/externalAdminUser').then(user => {
            const username = user.username;
            const password = user.password;

            cy.login(username, password);
        })
    })

    it('Follow the create campaign flow', () => {

        cy.url().should('include', '/main/dashboard');
        cy.get('.jss145').should('be.visible');

        cy.get('button').contains('Create campaign').click();
        cy.url().should('include', '/main/evaluate/campaigns/create');

        cy.get('#mui-component-select-clientId').select('Play Consulting');

        cy.get('input').contains('name', 'title').clear().type('Play Automation Campaign');
        cy.get('input').contains('name', 'description').clear().type('Play Automation Campaign');

        cy.get('#mui-component-select-frameworkId').select('Fraud Control Framework');
        cy.get('#mui-component-select-managerId').select('Nicholas Ofonagoro');

    })
})
