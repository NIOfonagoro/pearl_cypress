const { QA_CONNECTED_RISK_ENGINE_URL } = require('../../../config.js');

describe('Create Campaign', () => {
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

    it('Should follow the benchmarking comparison flow', () => {

        cy.url().should('include', '/main/dashboard');
        cy.get('.jss145').should('be.visible');

        cy.get('button').contains('Analyse').click();
        cy.get('li').contains('Benchmarking').click();
        cy.get('span').should('contain', 'Benchmarking');

        cy.get('button').contains('Select campaign').click();
        cy.get('span').contains('QA Test Data TRD').click();
        cy.get('button').contains('Apply').click();

        cy.get('button').contains('Select region/country').click();
        cy.get('label').contains('Global').click();
        cy.get('button').contains('Apply').click();
        
        cy.get('button').contains('Select industry').click();
        cy.get('label').contains('Select All').click();
        cy.get('button').contains('Apply').click();

        cy.get('button').contains('Select company type').click();
        cy.get('label').contains('Select All').click();
        cy.get('button').contains('Apply').click();

        cy.get('button').contains('Select assessment type').click();
        cy.get('label').contains('Select All').click();
        cy.get('button').contains('Apply').click();

        cy.get('button').contains('Select revenue').click();
        cy.get('label').contains('Select All').click();
        cy.get('button').contains('Apply').click();

        //Select date
        cy.get('div').contains('Select date range').click();

        cy.get('span').contains('Select month').eq(0).click();
        cy.get('li').contains('January').click();
        cy.get('div').contains('Select').eq(0).click();
        cy.get('li').contains('2018').click();

        cy.get('span').contains('Select month').eq(1).click();
        cy.get('li').contains('January').click();
        cy.get('div').contains('Select').eq(1).click();
        cy.get('li').contains('2018').click();

        cy.get('button').contains('Apply').click();




    })
})