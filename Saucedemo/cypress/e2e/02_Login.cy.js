describe("Login", ()=>{
    
    beforeEach(()=>{
        cy.visit("/");
        cy.get(".col-lg-9").should("be.visible").and("have.length.at.least", 1);

    });

    it("Login with Invalid Credentials", ()=>{
        cy.get(".navbar-collapse .navbar-nav").find("#login2").click();
        cy.get("#logInModal .modal-content").should("be.visible").and("contain", "Log in").within(()=>{
            cy.get("#loginusername").click({force:true}).should("be.focused").and("be.empty").type("Testilo", {force:true});
            cy.get("#loginpassword").click().should("be.focused").and("be.empty").type("Testi");
            cy.on("window:alert", (alertText) => {
                     expect(alertText).to.equal("Wrong password.");
            });
         cy.get(".btn-primary").should("be.visible")
              .and("have.css", "background-color", "rgb(2, 117, 216)")
              .and("have.text", "Log in").click({force:true})
        })
    
    })

    it("Successful login",()=>{
        cy.get(".navbar-collapse .navbar-nav").find("#login2").click();
        cy.get("#logInModal .modal-content").should("be.visible").and("contain", "Log in").within(()=>{
            cy.get("#loginusername").click({force:true}).should("be.focused").and("be.empty").type("Testilo", {force:true});
            cy.get("#loginpassword").click().should("be.focused").and("be.empty").type("Testing");
            cy.get(".btn-primary").should("be.visible")
              .and("have.css", "background-color", "rgb(2, 117, 216)")
              .and("have.text", "Log in").click({force:true})
      })
      cy.get("#nameofuser").should("be.visible").and("have.text", "Welcome Testilo")
    })
})


