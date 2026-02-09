const { faker } = require("@faker-js/faker");

describe("Login", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get(".col-lg-9").should("be.visible").and("have.length.at.least", 1);
  });

  it("Login with Invalid Credentials", () => {
    cy.get(".navbar-collapse .navbar-nav").find("#login2").click();
    cy.get("#logInModal .modal-content")
      .should("be.visible")
      .and("contain", "Log in")
      .within(() => {
        cy.get("#loginusername")
          .click({ force: true })
          .should("be.focused")
          .and("be.empty")
          .type("Testilo", { force: true });
        cy.get("#loginpassword")
          .click()
          .should("be.focused")
          .and("be.empty")
          .type("Testi");
        cy.on("window:alert", (alertText) => {
          expect(alertText).to.equal("Wrong password.");
        });
        cy.get(".btn-primary")
          .should("be.visible")
          .and("have.css", "background-color", "rgb(2, 117, 216)")
          .and("have.text", "Log in")
          .click({ force: true });
      });
  });

  it("Successful login", () => {
    cy.get(".navbar-collapse .navbar-nav").find("#login2").click();
    cy.fixture("users").then((users) => {
      cy.get("#logInModal .modal-content")
        .should("be.visible")
        .and("contain", "Log in")
        .within(() => {
          cy.get("#loginusername")
            .click({ force: true })
            .should("be.focused")
            .and("be.empty")
            .type(users.ValidUser.username, { force: true });
          cy.get("#loginpassword")
            .click()
            .should("be.focused")
            .and("be.empty")
            .type(users.ValidUser.password);
          cy.get(".btn-primary")
            .should("be.visible")
            .and("have.css", "background-color", "rgb(2, 117, 216)")
            .and("have.text", "Log in")
            .click({ force: true });
        });

      cy.get("#nameofuser")
        .should("be.visible")
        .and("have.text", `Welcome ${users.ValidUser.username}`);
    });
  });

  it("Logout and verify user is logged out", () => {
    cy.fixture("users").then((users) => {
      cy.login(users.ValidUser.username, users.ValidUser.password);
    });
    cy.wait(1000);
    cy.get(".navbar-collapse .navbar-nav")
      .find("#logout2")
      .should("be.visible")
      .and("contain.text", "Log out")
      .click({ force: true });
    cy.get("#nameofuser", { timeout: 10000 }).should("not.be.visible");
    cy.get("#login2").should("be.visible").and("contain.text", "Log in");
  });
});
