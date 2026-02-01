describe("Verify The Test Cases Page", () => {
  beforeEach(() => {
    cy.visit("http://automationexercise.com/");
  });

  it("Navigate to Test Cases Page", () => {
    cy.get("[alt = 'Website for automation practice']").should("be.visible");
    cy.contains("[href='/test_cases']", "Test Cases")
      .should("be.visible")
      .click();
    cy.url().should("eq", "https://automationexercise.com/test_cases");
    cy.get(".title.text-center")
      .should("be.visible")
      .and("contain.text", "Test Cases");
  });
});
