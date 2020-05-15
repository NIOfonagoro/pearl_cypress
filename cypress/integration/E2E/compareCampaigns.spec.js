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

    it('Should be able to Compare Campaigns', () => {

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

        //Will need to change next contains to "2nd" once bug is fixed
        cy.get('button').contains('Select 2st campaign').click();
        cy.get('li').contains('QA Test Data FCF').click();

        // We have to click a neutral area to exit the dropdown menu... probably a bug
        cy.get('#simple-popover').click();

        //Assert that the correct data is showing once the FE is implemented
        

    })

    it('Should be able to compare assessments within a campaign', () => {

        cy.url().should('include', '/main/dashboard');
        cy.get('.jss145').should('be.visible');

        cy.get('button').contains('Analyse').click();
        cy.get('li').contains('Comparison').click();
        cy.get('span').should('contain', 'Comparison');

        cy.get('div').contains('Compare assessments within a campaign').click();

        //Assert that the correct data is showing once the FE is implemented

    })

    it('Should be able to compare assessments from different campaigns', () => {

        cy.url().should('include', '/main/dashboard');
        cy.get('.jss145').should('be.visible');

        cy.get('button').contains('Analyse').click();
        cy.get('li').contains('Comparison').click();
        cy.get('span').should('contain', 'Comparison');

        cy.get('div').contains('Compare assessments from different campaigns').click();
        
        //Assert that the correct data is showing once the FE is implemented

    })
    
    
})