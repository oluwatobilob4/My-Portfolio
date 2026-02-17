const { faker } = require("@faker-js/faker");

describe("Register USer", () => {
  beforeEach(() => {
    cy.visit("http://automationexercise.com/");
  });

  it("Register User with existing email", () => {
    cy.get("[alt = 'Website for automation practice']").should("be.visible");
    cy.get("[href='/login']")
      .should("be.visible")
      .and("contain", "Signup / Login")
      .click();
    cy.get(".signup-form")
      .should("be.visible")
      .and("contain", "New User Signup!");
    cy.get("[data-qa='signup-name']")
      .should("exist")
      .and("be.empty")
      .type("testuser");
    cy.get("[data-qa='signup-email']")
      .should("exist")
      .and("be.empty")
      .type("testuser@example.com");
    cy.get("[data-qa='signup-button']")
      .should("be.visible")
      .contains("Signup")
      .click();
    cy.contains("p", "Email Address already exist!")
      .should("be.visible")
      .and("have.css", "color", "rgb(255, 0, 0)"); // Asserting the red color too
  });

  it("Register User with valid details", () => {
    cy.get("[alt = 'Website for automation practice']")
      .should("be.visible")
      .and("have.attr", "src", "/static/images/home/logo.png");
    // Generate random user details using faker
    const randomName = faker.person.firstName();
    const randomSecondName = faker.person.lastName();
    const randomEmail = faker.internet.email();
    // Navigate to Signup/Login page
    cy.get("[href='/login']")
      .should("be.visible")
      .and("contain", "Signup / Login")
      .click();
    cy.get(".signup-form")
      .should("be.visible")
      .and("contain", "New User Signup!");
    cy.get("[data-qa='signup-name']")
      .should("exist")
      .and("be.empty")
      .type(randomName);
    cy.get("[data-qa='signup-email']")
      .should("exist")
      .and("be.empty")
      .type(randomEmail);
    cy.get("[data-qa='signup-button']")
      .should("be.visible")
      .contains("Signup")
      .and("be.enabled")
      .click();
    // Fill in the account information form
    cy.get(".login-form>.text-center")
      .should("be.visible")
      .and("contain", "Enter Account Information");

    cy.get(".radio-inline").should("have.length", 2);
    cy.get("#id_gender1").check().should("be.checked");
    cy.get("#password").should("exist").and("be.empty").type("password123");
    cy.get("#days").select("10").should("have.value", "10");
    cy.get("#months").select("May").should("have.value", "5");
    cy.get("#years").select("2021").should("have.value", "2021");
    cy.get("#newsletter").check().should("be.checked");
    cy.get("#optin").check().should("be.checked");
    cy.get("#first_name").should("exist").and("be.empty").type(randomName);
    cy.get("#last_name").should("exist").and("be.empty").type(randomSecondName);
    cy.get("#company").should("exist").and("be.empty").type("testcompany");
    cy.get("#address1").should("exist").and("be.empty").type("testaddress1");
    cy.get("#country")
      .select("United States")
      .should("have.value", "United States");
    cy.get("#state").should("exist").and("be.empty").type("teststate");
    cy.get("#city").should("exist").and("be.empty").type("testcity");
    cy.get("#zipcode").should("exist").and("be.empty").type("323232");
    cy.get("#mobile_number").should("exist").and("be.empty").type("1234567890");
    cy.get("[data-qa='create-account']")
      .should("be.visible")
      .contains("Create Account")
      .click();
    // Verify account creation and logged in state
    cy.get("[data-qa='account-created']")
      .should("be.visible")
      .and("contain", "Account Created!");
    cy.get("[data-qa='continue-button']")
      .should("be.visible")
      .and("contain", "Continue")
      .click();
    cy.get(".navbar-nav > :nth-child(10) > a")
      .should("be.visible")
      .and("contain", `Logged in as ${randomName}`);
    cy.get("a[href='/delete_account']")
      .should("be.visible")
      .and("contain", " Delete Account")
      .click();
    cy.get("[data-qa='account-deleted']")
      .should("be.visible")
      .and("contain", "Account Deleted!");
    cy.get("[data-qa='continue-button']")
      .should("be.visible")
      .and("contain", "Continue")
      .click();
  });

  it("Register multiple users", () => {
    cy.get("[alt = 'Website for automation practice']")
      .should("be.visible")
      .and("have.attr", "src", "/static/images/home/logo.png");
    // Generate multiple random user details using faker and register them
    for (let i = 0; i <= 5; i++) {
      const randomName = faker.person.firstName();
      const randomSecondName = faker.person.lastName();
      const randomEmail = faker.internet.email();
      cy.get("[href='/login']")
        .should("be.visible")
        .and("contain", "Signup / Login")
        .click();
      cy.get(".signup-form")
        .should("be.visible")
        .and("contain", "New User Signup!");
      cy.get("[data-qa='signup-name']")
        .should("exist")
        .and("be.empty")
        .type(randomName);
      cy.get("[data-qa='signup-email']")
        .should("exist")
        .and("be.empty")
        .type(randomEmail);
      cy.get("[data-qa='signup-button']")
        .should("be.visible")
        .contains("Signup")
        .and("be.enabled")
        .click();
      // Fill in the account information form
      cy.get(".login-form>.text-center")
        .should("be.visible")
        .and("contain", "Enter Account Information");

      cy.get(".radio-inline").should("have.length", 2);
      cy.get("#id_gender1").check().should("be.checked");
      cy.get("#password").should("exist").and("be.empty").type("password123");
      cy.get("#days").select("10").should("have.value", "10");
      cy.get("#months").select("May").should("have.value", "5");
      cy.get("#years").select("2021").should("have.value", "2021");
      cy.get("#newsletter").check().should("be.checked");
      cy.get("#optin").check().should("be.checked");
      cy.get("#first_name").should("exist").and("be.empty").type(randomName);
      cy.get("#last_name")
        .should("exist")
        .and("be.empty")
        .type(randomSecondName);
      cy.get("#company").should("exist").and("be.empty").type("testcompany");
      cy.get("#address1").should("exist").and("be.empty").type("testaddress1");
      cy.get("#country")
        .select("United States")
        .should("have.value", "United States");
      cy.get("#state").should("exist").and("be.empty").type("teststate");
      cy.get("#city").should("exist").and("be.empty").type("testcity");
      cy.get("#zipcode").should("exist").and("be.empty").type("323232");
      cy.get("#mobile_number")
        .should("exist")
        .and("be.empty")
        .type("1234567890");
      cy.get("[data-qa='create-account']")
        .should("be.visible")
        .contains("Create Account")
        .click();
      // Verify account creation and logged in state
      cy.get("[data-qa='account-created']")
        .should("be.visible")
        .and("contain", "Account Created!");
      cy.get("[data-qa='continue-button']")
        .should("be.visible")
        .and("contain", "Continue")
        .click();
      cy.get(".navbar-nav > :nth-child(10) > a")
        .should("be.visible")
        .and("contain", `Logged in as ${randomName}`);
      // Logout and clean up for the next iteration
      cy.clearCookies();
      cy.clearLocalStorage({ force: true });
      cy.reload();
    }
  });
});
