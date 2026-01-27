describe("Verify the cart functionality", () => {
  beforeEach(() => {
    cy.visit("http://automationexercise.com/");
  });

  it("Add products to cart and verify cart contents", () => {
    cy.get("[alt = 'Website for automation practice']").should("be.visible");
    cy.get("[href='/products']")
      .should("be.visible")
      .and("contain", "Products")
      .click();
    // Verify navigation to Products page
    cy.url().should("eq", "https://automationexercise.com/products");
    cy.get(".features_items")
      .should("be.visible")
      .and("have.length.greaterThan", 0);

    // Add first product to cart
    cy.get(".product-image-wrapper")
      .eq(0)
      .within(() => {
        // 1. Force the hidden overlay to appear in the DOM
        cy.get(".overlay-content").invoke("show");

        // 2. Assert that it is now visible to the user
        cy.get(".overlay-content").should("be.visible");

        // 3. Assert it contains the correct text (Price and Name)
        cy.get(".overlay-content")
          .should("contain", "Rs. 500")
          .and("contain", "Blue Top");

        // 4. Now click the specific 'Add to cart' inside this overlay
        cy.get(".add-to-cart").first().click();
      });
    // 5. Verify that the product was added to the cart
    cy.get(".modal-content").should("be.visible");
    cy.get(".modal-content h4").should("contain", "Added!");
    cy.get(".modal-content .btn-success")
      .should("be.visible")
      .and("contain", "Continue Shopping")
      .click();

    // Add second product to cart
    cy.get(".product-image-wrapper")
      .eq(1)
      .within(() => {
        cy.get(".overlay-content").invoke("show");
        cy.get(".overlay-content").should("be.visible");
        cy.get(".overlay-content")
          .should("contain", "Rs. 400")
          .and("contain", "Men Tshirt");
        cy.get(".add-to-cart").first().click();
      });
    cy.get(".modal-content").should("be.visible");
    cy.get(".modal-content h4").should("have.text", "Added!");
    cy.get(".modal-body>.text-center>[href='/view_cart']")
      .should("be.visible")
      .click();
    // Verify cart contents
    cy.url().should("eq", "https://automationexercise.com/view_cart");
    cy.get("#cart_items").should("be.visible");
    cy.get("#cart_info tbody tr").should("have.length", 2);

    // Define our expected data in an array (Cleaner and easier to manage)
    const expectedItems = [
      { name: "Blue Top", price: "Rs. 500", qty: "1" },
      { name: "Men Tshirt", price: "Rs. 400", qty: "1" },
    ];

    // Loop through the rows and check each one
    expectedItems.forEach((item, index) => {
      cy.get("#cart_info tbody tr")
        .eq(index)
        .within(() => {
          cy.get(".cart_description").should("contain", item.name);
          cy.get(".cart_price").should("contain", item.price);
          cy.get(".cart_quantity").should("include.text", item.qty); // Asserting Quantity here!
        });
    });
  });
});
