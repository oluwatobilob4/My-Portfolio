describe("Login Scenario", () => {
  beforeEach(() => {
    cy.visit("http://automationexercise.com/");
  });

  it("Login with invalid credentials", () => {
    cy.get("[alt = 'Website for automation practice']").should("be.visible");
    cy.get("[href='/login']")
      .should("be.visible")
      .and("contain", "Signup / Login")
      .click();
    cy.get(".login-form ")
      .should("be.visible")
      .and("contain.text", "Login to your account");
    cy.get("[data-qa='login-email']")
      .should("exist")
      .and("be.empty")
      .type("test@gmail.com");
    cy.get("[data-qa='login-password']")
      .should("exist")
      .and("be.empty")
      .type("wrongpassword");
    cy.get("[data-qa='login-button']")
      .should("be.visible")
      .and("contain", "Login")
      .click();
    cy.contains("p", "Your email or password is incorrect!")
      .should("be.visible")
      .and("have.css", "color", "rgb(255, 0, 0)"); // Asserting the red color too
  });

  it("Login with valid credentials", () => {
    cy.get("[alt = 'Website for automation practice']").should("be.visible");
    cy.get("[href='/login']")
      .should("be.visible")
      .and("contain", "Signup / Login")
      .click();
    cy.get(".login-form ")
      .should("be.visible")
      .and("contain.text", "Login to your account");
    cy.get("[data-qa='login-email']")
      .should("exist")
      .and("be.empty")
      .type("test@mailto.com");
    cy.get("[data-qa='login-password']")
      .should("exist")
      .and("be.empty")
      .type("testing");
    cy.get("[data-qa='login-button']")
      .should("be.visible")
      .and("contain", "Login")
      .click();
    cy.get(":nth-child(10) > a")
      .should("be.visible")
      .and("contain", "Logged in as Test");
    cy.get("[href='/logout']")
      .should("be.visible")
      .and("contain", "Logout")
      .click();
  });
});
