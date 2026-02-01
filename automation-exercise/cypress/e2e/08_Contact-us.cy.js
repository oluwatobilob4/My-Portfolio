describe("Contact Us Form", ()=>{
    beforeEach(()=>{
        cy.visit("https://automationexercise.com/")
    })

    it("Verify the contact us form", ()=>{
        cy.get("[alt = 'Website for automation practice']").should("be.visible");
        cy.get(".nav [href='/contact_us']").should("be.visible").and("include.text", "Contact us").click();
        // Navigate to the contact us page
        cy.get(".contact-form .text-center").should("include.text", "Get In Touch").and("be.visible");
        // filling the form
        cy.get("[id='contact-us-form']").within(()=>{
            cy.get("[data-qa='name']").should("be.empty").type("Test");
            cy.get("[data-qa='email']").should("be.empty").type("test@gmail.com");
            cy.get("[data-qa='subject']").should("be.empty").type("Product Enquiry");
            cy.get("[data-qa='message']").should("be.empty").type("Just want to know about a few products");
            cy.get("[type='file']").selectFile('cypress/fixtures/image.jpg');

            // cy.get("[type='file']").should("contain", "image.jpg");
            cy.get(".submit_form").should("be.visible").click()
        });
        // Verifying the form is successfully submitted
        cy.get(".contact-form .alert-success").should("be.visible")
        .and("include.text", "Success! Your details have been submitted successfully.")
        .and("have.css", "background-color", "rgb(223, 240, 216)")
        cy.get(".contact-form .btn-success").should("be.visible")
        .and("have.css", "background-color", "rgb(92, 184, 92)")
        .and("include.text", "Home").click();

    })
})