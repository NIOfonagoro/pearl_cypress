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

    it('Should follow the benchmarking comparison flow', () => {

        cy.url().should('include', '/main/dashboard');
        cy.get('.jss145').should('be.visible');

        cy.get('button').contains('Analyse').click();
        cy.get('li').contains('Comparison').click();
        cy.get('span').should('contain', 'Comparison');

        cy.get('button').contains('Select 1st campaign').click();
        cy.get('li').contains('Fraud Control Framework').click();
        cy.get('li').contains('Play Campaign').click();
        
        // We have to click a neutral area to exit the dropdown menu... probably a bug
        cy.get('#simple-popover').click();

        cy.get('button').contains('Select 2nd campaign').click();
        cy.get('li').contains('QA Test Data FCF').click();
        

    })
})