window.process = { env: {} };
describe("Product list and Product details Test", ()=>{
    beforeEach(()=>{
        // login before each test
        cy.loginSession("Testilo", "Testing");
        cy.visit("/");
        cy.get("#narvbarx .navbar-brand").should("be.visible");
        // cy.location('pathname').should('eq', '/index.html');
        cy.get(".col-lg-9").should("be.visible").and("have.length.at.least", 1);
    })

    it.only("Verify product categories on homepage", ()=>{
        cy.get(".list-group").should("be.visible").and("include.text", "CATEGORIES").and("have.length", 1).within(()=>{
            cy.contains("Phones").should("be.visible").and("have.attr", "href");
            cy.contains("Laptops").should("be.visible").and("have.attr", "href");
            cy.contains("Monitors").should("be.visible").and("have.attr", "href");
            cy.get("#itemc").its("length").then((length)=>{
                cy.get("#itemc").eq(Math.floor(Math.random() * length)).click({force:true});
            });
        });
        cy.verifyProductDetails();
    });

    it("Verify product list on homepage", ()=>{
        cy.get("#tbodyid .card").should("be.visible").and("have.length.at.least", 1);
        cy.verifyProductDetails();
    });

    it("Verify product details page", ()=>{
        cy.get("#tbodyid .card").should("be.visible")
            .and("have.length.at.least", 1).first().within(()=>{
                cy.get(".card-title a").click({force:true});
                 
        });
        cy.url().should('include', 'prod.html');
        cy.get(".product-wrap .name").should("be.visible").and("not.be.empty");
        cy.get(".product-wrap .description").should("be.visible").and("not.be.empty");
        cy.get(".product-wrap .price-container").should("be.visible").and("not.be.empty");
        cy.get(".product-image").should("be.visible");

    });

})