const { QA_CONNECTED_RISK_ENGINE_URL } = require('../../../config.js');

describe('Compare Campaign Flows', () => {
    beforeEach(function () {
        cy.visit(QA_CONNECTED_RISK_ENGINE_URL);
        cy.url().should('include', 'qa.pearl.pwc.com');
        cy.title().should('eq', 'Log in to Connected Risk Engine');

        cy.fixture('users/externalAdminUser').then(user => {
            const username = user.username;
            const password = user.password;

            cy.login(username, password);
        })
    })

    it('Should be able to compare assessments within a campaign', () => {

        cy.url().should('include', '/main/dashboard');
        cy.get('.jss145').should('be.visible');

        cy.get('button').contains('Analyse').click();
        cy.get('li').contains('Threat and Risk Analysis').click();
        cy.get('span').should('contain', 'Threat and risk analysis');
        cy.get('div').contains('Risk dashboard').click();

        cy.get('button').contains('Select Campaign').click();
        cy.get('div').contains('QA Test Data FCF').click();

        //typo in "assessments". Change once bug is fixed
        cy.get('button').contains('Select Asessment(s)').click();
        cy.get('div').contains('London').click();
        cy.get('div').contains('Manchester').click();
        cy.get('button').contains('Apply').click();

        //Assert that the correct data is showing once the FE is implemented

    })


    
})