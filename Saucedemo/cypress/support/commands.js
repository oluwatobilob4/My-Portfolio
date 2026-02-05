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
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

/// <reference types='cypress'/>

Cypress.Commands.add('loginSession', (username = 'Testilo', password = 'Testing') => {
	cy.session([username, password], () => {
        cy.visit("/");
		cy.get(".navbar-collapse .navbar-nav").find("#login2").click();
		cy.get("#logInModal .modal-content").should("be.visible").and("contain", "Log in").within(()=>{
			cy.get("#loginusername").click({force:true}).should("be.focused").and("be.empty").type(username, {force:true});
			cy.get("#loginpassword").click().should("be.focused").and("be.empty").type(password);
			cy.get(".btn-primary").should("be.visible")
				.and("have.css", "background-color", "rgb(2, 117, 216)")
				.and("have.text", "Log in").click({force:true})
		})
		cy.get("#nameofuser").should("be.visible").and("have.text", `Welcome ${username}`)
	}, { 
        validate() {
      // Cypress will visit the homepage and check if Logout exists
      cy.visit('/');
      cy.get('#logout2').should('be.visible');
    } 
})

    
});