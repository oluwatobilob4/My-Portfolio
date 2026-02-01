describe("Verify the Subscription section", ()=>{
    beforeEach(()=>{
        cy.visit("https://automationexercise.com/")     
    });

    it("Verify Scroll Up using 'Arrow' button and Scroll Down functionality", ()=>{
        cy.get("[alt = 'Website for automation practice']").should("be.visible");
        cy.get(".single-widget").scrollIntoView()
        .contains("h2", "Subscription").and("be.visible");

        // Using the arrow icon to navigate back to the top of the page
        cy.get(".fa-angle-up").should("be.visible").click()
        cy.contains("h2", "Full-Fledged practice website for Automation Engineers").should("be.visible")
    })

    it("Verify Scroll Up without 'Arrow' button and Scroll Down functionality", ()=>{
        cy.get("[alt = 'Website for automation practice']").should("be.visible");
        cy.get(".single-widget").scrollIntoView()
        .contains("h2", "Subscription").and("be.visible")
        // Navigating to the top without using the arrow icon
        cy.contains("h2", "Full-Fledged practice website for Automation Engineers")
        .scrollIntoView().and("be.visible")
    })

    it("Verify Subscription in home page", ()=>{
        cy.get("[alt = 'Website for automation practice']").should("be.visible");

        // scroll to the subscription section and fill the form
        cy.get(".single-widget").scrollIntoView()
        .contains("h2", "Subscription").and("be.visible")
        cy.get("#susbscribe_email").should("be.empty").type("test@gmail.com")
        cy.get("#subscribe").should("exist").click()
        cy.get("#success-subscribe").should("not.be.hidden")
        .and("include.text", "You have been successfully subscribed!")
    })

    it("Verify Subscription in Cart page", ()=>{
        cy.get("[alt = 'Website for automation practice']").should("be.visible");

        // navigate to cart
        cy.get(".nav [href='/view_cart']").should("be.visible").and("include.text", "Cart").click()

        // navigate to the subcription section and fill the form
        cy.get(".single-widget").contains("h2", "Subscription").and("be.visible");
        cy.get("#susbscribe_email").should("be.empty").type("test@gmail.com")
        cy.get("#subscribe").should("exist").click()
        cy.get("#success-subscribe").should("not.be.hidden")
        .and("include.text", "You have been successfully subscribed!")

    })
});