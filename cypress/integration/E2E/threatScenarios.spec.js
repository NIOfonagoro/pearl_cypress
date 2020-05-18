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

    it.only('Should be accessible through the Campaign Maturity Overview page', () => {
        cy.url().should('include', '/main/dashboard');
        cy.get('.jss145').should('be.visible');

        cy.get('[class="sc-gZMcBi sc-iQNlJl idcdkE"]')
        .contains('QA Test Data IPO v2')
        .parent().parent()
        .within(($campaign) => {
            cy.get('button').contains('View campaign').click();
        })
        
        cy.wait(2000);
        cy.get('button').contains('Campaign analysis').click();
        //risk should be capitalised so this will fail once the typo is corrected
        cy.get('div').contains('View Threat and risk Analysis').click();

        cy.wait(2000);
        cy.get('[class="sc-ekHBYt infonn"]').should('contain.text', 'QA Test Data IPO v2');

    })

    it('Should be able to compare assessments within a campaign', () => {

        cy.url().should('include', '/main/dashboard');
        cy.get('.jss145').should('be.visible');

        cy.get('button').contains('Analyse').click();
        cy.get('li').contains('Threat and Risk Analysis').click();
        cy.get('span').should('contain', 'Threat and risk analysis');

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