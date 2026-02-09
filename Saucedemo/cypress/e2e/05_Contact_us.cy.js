describe("Contact Us Test", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("Submit contact form and verify submission", () => {
    cy.get("[data-target='#exampleModal']")
      .should("be.visible")
      .and("contain.text", "Contact")
      .click({ force: true });
    cy.get("#exampleModal .modal-content")
      .should("be.visible")
      .within(() => {
        cy.get(".modal-header").should("include.text", "New message");
        cy.get("#recipient-email")
          .should("be.visible")
          .and("be.empty")
          .type("test@example.com");
        cy.get("#recipient-name")
          .should("be.visible")
          .and("be.empty")
          .type("Test User");
        cy.get("#message-text")
          .should("be.visible")
          .and("be.empty")
          .type("This is a test message.");
        cy.get(".btn-primary")
          .should("be.visible")
          .and("contain.text", "Send message")
          .and("have.css", "background-color", "rgb(2, 117, 216)")
          .click({ force: true });
      });
    cy.wait(1000);
    //   verify the form is empty after submission
    cy.get("[data-target='#exampleModal']")
      .should("be.visible")
      .and("contain.text", "Contact")
      .click({ force: true });
    cy.get("#exampleModal .modal-content")
      .should("be.visible")
      .and("include.text", "New message")
      .within(() => {
        cy.get("#recipient-email").should("be.empty");
        cy.get("#recipient-name").should("be.empty");
        cy.get("#message-text").should("be.empty");
      });
  });
});