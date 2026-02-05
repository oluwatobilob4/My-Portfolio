describe('template spec', () => {

  const username = 'Test' + Date.now()
  const password = 'Testing'
  beforeEach(()=>{
        cy.visit("/");
        cy.get("#narvbarx .navbar-brand").should("be.visible");
        // cy.location('pathname').should('eq', '/index.html');
        cy.get(".col-lg-9").should("be.visible").and("have.length.at.least", 1)
  })

  it('User creating and account Successfully', () => {
    // click on the signup link
    cy.get("#signin2").should("be.visible").and("have.text", "Sign up").click();
    // Assert it is visible and contains "Sign-up"
    cy.get("#signInModal .modal-content").should("be.visible").and("contain", "Sign up").within(()=>{
      cy.get("#sign-username").click({force:true}).should("be.empty").and("be.focused").type(username, {force:true}).should("have.value", username)
      cy.get("#sign-password").click().should("be.empty").and("be.focused").type(password);
      // set a listener for the window alert
      cy.on("window:alert", (alertText)=>{
        expect(alertText).to.eql("Sign up successful.")
      })
      cy.get("[onclick='register()']").should("be.visible")
      .and("have.css", "background-color", "rgb(2, 117, 216)")
      .and("have.text", "Sign up").click()
      cy.reload();
    })

      // login to verify the account was successfully created
      cy.get(".navbar-collapse .navbar-nav").find("#login2", {force:true}).click();
        cy.get("#logInModal .modal-content").should("be.visible").and("contain", "Log in").within(()=>{
            cy.get("#loginusername").click({force:true}).should("be.focused").and("be.empty").type(username, {force:true});
            cy.get("#loginpassword").click().should("be.focused").and("be.empty").type(password);
            cy.get(".btn-primary").should("be.visible")
              .and("have.css", "background-color", "rgb(2, 117, 216)")
              .and("have.text", "Log in").click({force:true})
      })
      cy.get("#nameofuser").should("be.visible").and("have.text", `Welcome ${username}`)
      cy.get(".navbar-collapse .navbar-nav").find("#logout2", {force:true}).click();
      // check the user is logged out
      cy.get("#nameofuser").should("not.be.visible").and("not.have.text", `Welcome ${username}`)

      })

    it("User registration with an existing email", ()=>{
      // click on the signup link
    cy.get("#signin2").should("be.visible").and("have.text", "Sign up").click();
    // Assert it is visible and contains "Sign-up"
    cy.get("#signInModal .modal-content").should("be.visible").and("contain", "Sign up").within(()=>{
      cy.get("#sign-username").click({force:true}).should("be.empty").and("be.focused").type(username, {force:true}).should("have.value", username)
      cy.get("#sign-password").click().should("be.empty").and("be.focused").type(password);
      // set a listener for the window alert
      cy.on("window:alert", (errorText)=>{
        expect(errorText).to.eql("This user already exist.")
      })
      cy.get("[onclick='register()']").should("be.visible")
      .and("have.css", "background-color", "rgb(2, 117, 216)")
      .and("have.text", "Sign up").click()
    })
      
    })
  
  })