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

    it('Should be accessible through the Campaign Maturity Overview page', () => {
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
        cy.get('div').contains('View Benchmarking').click();

        cy.wait(2000);
        cy.get('[class="sc-jGFFOr jbGtrF"]').should('contain.text', 'QA Test Data IPO v2');

    })

    it('<Peer group too small> Benchmarking comparison flow', () => {

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

        cy.get('button').contains('Select no. of employees').click();
        cy.get('label').contains('Select All').click();
        cy.get('button').contains('Apply').click();

        //Select date
        cy.get('div').contains('Select date range').click();

        cy.get('span').contains('Select month').eq(0).click();
        cy.get('li').contains('January').click();
        
        cy.get('[class="MuiPaper-root MuiMenu-paper MuiPopover-paper MuiPaper-elevation8 MuiPaper-rounded"]')
        .within(() => {
            cy.get('div').contains('Select').eq(0).click();
        })
        cy.get('li').contains('2018').click();
        
        cy.get('span').contains('Select month').click();
        cy.get('li').contains('July').click();

        cy.get('[class="MuiPaper-root MuiMenu-paper MuiPopover-paper MuiPaper-elevation8 MuiPaper-rounded"]')
        .within(() => {
            cy.get('div').contains('Select').click();
        })
        cy.get('li').contains('2018').click();
    
        cy.get('button').contains('Apply').click();

        cy.get('#alert-dialog-title').should('have.text', 'Peer group too small');

    })

    it.only('Check benchmarking Graph appears', () => {

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

        cy.get('button').contains('Select no. of employees').click();
        cy.get('label').contains('Select All').click();
        cy.get('button').contains('Apply').click();

        //Select date
        cy.get('div').contains('Select date range').click();

        cy.get('span').contains('Select month').eq(0).click();
        cy.get('li').contains('January').click();
        
        cy.get('[class="MuiPaper-root MuiMenu-paper MuiPopover-paper MuiPaper-elevation8 MuiPaper-rounded"]')
        .within(() => {
            cy.get('div').contains('Select').eq(0).click();
        })
        cy.get('li').contains('2018').click();
        
        cy.get('span').contains('Select month').click();
        cy.get('li').contains('December').click();

        cy.get('[class="MuiPaper-root MuiMenu-paper MuiPopover-paper MuiPaper-elevation8 MuiPaper-rounded"]')
        .within(() => {
            cy.get('div').contains('Select').click();
        })
        cy.get('li').contains('2020').click();
    
        cy.get('button').contains('Apply').click();
        cy.wait(3000)
        cy.get('span').contains('Benchmarking - QA Test Data TRD').should('be.visible');
        cy.get('[data-zr-dom-id="zr_999"]').should('have.length', 2);


    })
})