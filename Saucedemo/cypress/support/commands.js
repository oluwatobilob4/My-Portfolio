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

// const cypress = require("cypress");

Cypress.Commands.add(
  "loginSession",
  (username = "Testilo", password = "Testing") => {
    cy.session(
      [username, password],
      () => {
        cy.visit("/");
        cy.get(".navbar-collapse .navbar-nav").find("#login2").click();
        cy.get("#logInModal .modal-content")
          .should("be.visible")
          .and("contain", "Log in")
          .within(() => {
            cy.get("#loginusername")
              .click({ force: true })
              .should("be.focused")
              .and("be.empty")
              .type(username, { force: true });
            cy.get("#loginpassword")
              .click()
              .should("be.focused")
              .and("be.empty")
              .type(password);
            cy.get(".btn-primary")
              .should("be.visible")
              .and("have.css", "background-color", "rgb(2, 117, 216)")
              .and("have.text", "Log in")
              .click({ force: true });
          });
        cy.get("#nameofuser")
          .should("be.visible")
          .and("have.text", `Welcome ${username}`);
      },
      {
        validate() {
          // Cypress will visit the homepage and check if Logout exists
          cy.visit("/");
          cy.get("#logout2").should("be.visible");
        },
      },
    );
  },
);

Cypress.Commands.add(
  "login",
  (username, password) => {
    cy.visit("/");
    cy.get(".navbar-collapse .navbar-nav").find("#login2").click();
    cy.get("#logInModal .modal-content")
      .should("be.visible")
      .and("contain", "Log in")
      .within(() => {
        cy.get("#loginusername")
          .click({ force: true })
          .should("be.focused")
          .and("be.empty")
          .type(username, { force: true });
        cy.get("#loginpassword")
          .click()
          .should("be.focused")
          .and("be.empty")
          .type(password);
        cy.get(".btn-primary")
          .should("be.visible")
          .and("have.css", "background-color", "rgb(2, 117, 216)")
          .and("have.text", "Log in")
          .click({ force: true });
      });
    cy.get("#nameofuser")
      .should("be.visible")
      .and("have.text", `Welcome ${username}`);
  },
  {
    validate() {
      // Cypress will visit the homepage and check if Logout exists
      cy.visit("/");
      cy.get("#logout2").should("be.visible");
    },
  },
);

Cypress.Commands.add("verifyProductDetails", () => {
  cy.get("#tbodyid .card", { timeout: 10000 })
    .should("be.visible")
    .and("have.length.at.least", 1)
    .each(($el) => {
      cy.wrap($el).within(() => {
        cy.get(".card-title").should("be.visible").and("not.be.empty");
        cy.get(".card-text").should("be.visible").and("not.be.empty");
        cy.get(".card-title a")
          .should("be.visible")
          .and("have.attr", "href")
          .and("include", "prod.html?idp_=");
        cy.get(".card-block h5").should("be.visible").and("not.be.empty");
        cy.get(".card-img-top")
          .should("be.visible")
          .and("have.attr", "src")
          .and("include", "imgs/");
      });
    });
});
