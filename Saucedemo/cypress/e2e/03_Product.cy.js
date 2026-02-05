describe("Product list and Product details Test", ()=>{
    beforeEach(()=>{
        // login before each test
        cy.loginSession("Testilo", "Testing");
        cy.visit("/");
        cy.get("#narvbarx .navbar-brand").should("be.visible");
        // cy.location('pathname').should('eq', '/index.html');
        cy.get(".col-lg-9").should("be.visible").and("have.length.at.least", 1);
    })

    it("Verify product list on homepage", ()=>{
        cy.get("#tbodyid .card").should("be.visible").and("have.length.at.least", 1);
        cy.get("#tbodyid .card").each(($el, index, $list)=>{
            cy.wrap($el).within(()=>{
                cy.get(".card-title").should("be.visible").and("not.be.empty");
                cy.get(".card-text").should("be.visible").and("not.be.empty");
                cy.get(".card-title a").should("be.visible").and("have.attr", "href").and("include", "prod.html?idp_=");
                cy.get(".card-block h5").should("be.visible").and("not.be.empty");
                cy.get(".card-img-top").should("be.visible").and("have.attr", "src").and("include", "imgs/");
            });
        });
    });

    it("Verify product details page", ()=>{
        cy.get("#tbodyid .card").should("be.visible")
            .and("have.length.at.least", 1).first().within(()=>{
                cy.get(".card-title a").click({force:true});
                 cy.url().should('include', 'prod.html');
        });
        cy.get(".product-wrap .name").should("be.visible").and("not.be.empty");
        cy.get(".product-wrap .description").should("be.visible").and("not.be.empty");
        cy.get(".product-wrap .price-container").should("be.visible").and("not.be.empty");
        cy.get(".product-image").should("be.visible");

        
        

    });
})