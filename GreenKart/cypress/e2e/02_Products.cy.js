describe("Products and Carts test suite", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get(".brand").then(($el) => {
      const brandname = $el.text();
      expect(brandname).to.equal("GREENKART");
    });
  });

  it("Add product to cart", () => {
    // Add products to cart
    var cartCount = 0;
    var priceSum = 0;

    for (let i = 0; i <= 3; i++) {
      cy.get(".products .product:visible")
        .its("length")
        .then((length) => {
          const randomIndex = Math.floor(Math.random() * length);
          // Add a product to cart
          cy.get(".product:visible")
            .eq(randomIndex)
            .within(() => {
              cy.get(".product-price").then(($el) => {
                const amount = parseFloat($el.text());

                cy.get('[type="button"]').click();

                // assert the add to cart button indicates product has been added to cart
                cy.contains("✔ ADDED")
                  .should("be.visible")
                  .and("have.css", "background-color", "rgb(252, 119, 16)");

                priceSum = priceSum + amount;
                cartCount += 1;
              });
            });

          // Verify the cart count and price
          cy.then(() => {
            cy.get(".cart-info td").eq(2).should("have.text", cartCount);
            cy.get(".cart-info td").eq(5).should("have.text", priceSum);
          });
        });
    }

    // Verify after all products added
    cy.then(() => {
      cy.get(".cart-icon").should("be.visible").click();

      cy.get(".cart-preview  .cart-item")
        .should("be.visible")
        .and("have.length", cartCount);
    });
  });
});
