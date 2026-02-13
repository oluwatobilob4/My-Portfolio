describe("Verify the cart functionality", () => {
  beforeEach(() => {
    cy.visit("http://automationexercise.com/");
    cy.get("[alt = 'Website for automation practice']").should("be.visible");
  });

  it("Add products to cart and verify cart contents", () => {
    // Navigate to Products page
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
        cy.get(".overlay-content")
          .should("be.visible")
          .and("contain", "Rs. 500")
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

    // Define expected data in an array (Cleaner and easier to manage)
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
          cy.get(".cart_quantity").should("include.text", item.qty);
        });
    });
  });

  it("Verify Product Quantity in Cart", () => {
    // Navigate to Products page
    cy.get("[href='/products']")
      .should("be.visible")
      .and("contain", "Products")
      .click();
    // Add a product to the cart
    cy.get(".product-image-wrapper")
      .eq(0)
      .within(() => {
        cy.get(".nav-justified").should("be.visible").click();
      });
    cy.url().should("eq", "https://automationexercise.com/product_details/1");
    cy.get(".product-information")
      .should("be.visible")
      .and("contain.text", "Blue Top")
      .and("contain.text", "Category: Women > Tops")
      .and("contain.text", "Rs. 500")
      .and("contain.text", "Availability: In Stock")
      .and("contain.text", "Condition: New")
      .and("contain.text", "Brand: Polo");
    // Change quantity to 4
    cy.get("#quantity").should("have.value", "1").clear().type("4");
    // Add to cart
    cy.get(".cart").should("be.visible").click();
    // View Cart
    cy.get(".modal-content").should("be.visible");
    cy.get(".modal-content h4").should("have.text", "Added!");
    cy.get(".modal-body>.text-center>[href='/view_cart']")
      .should("be.visible")
      .click();
    // Verify that the quantity is 4 in the cart
    cy.url().should("eq", "https://automationexercise.com/view_cart");
    cy.get("#cart_items")
      .should("be.visible")
      .and("have.length.greaterThan", 0);
    cy.get("#cart_info tbody tr .cart_quantity").should("include.text", "4");
  });

  it.only("Add to cart from recommended products and verify", () => {
    // Scroll to Recommended items
    cy.get(".recommended_items")
      .scrollIntoView()
      .invoke("attr", "style", "animation: none; scroll-behavior: auto;")
      .should("be.visible")
      .and("include.text", "recommended items")
      .and("have.length.greaterThan", 0);
    // Add first recommended product to cart
    cy.get(".recommended_items .product-image-wrapper")
      .its("length")
      .then((length) => {
        const randomIndex = Math.floor(Math.random() * length);
        cy.get(".recommended_items .product-image-wrapper")
          .eq(randomIndex)
          .scrollIntoView()
          .within(() => {
            cy.get("[data-product-id]").eq(0).click({ force: true });
          });
      });
    cy.get(".modal-content").should("be.visible");
    cy.get(".modal-content h4").should("have.text", "Added!");
    cy.get("[data-dismiss='modal']").should("be.visible").click();
    // View Cart
    cy.get(".navbar-nav [href='/view_cart']").should("be.visible").click();
    cy.get("#cart_items")
      .should("be.visible")
      .and("have.length.greaterThan", 0);
    cy.get("#cart_info tbody tr").should("have.length", 1);
  });

  it.only("Remove product from cart and verify", () => {
    // Add a product to the cart
    cy.get(".product-image-wrapper")
      .eq(0)
      .within(() => {
        cy.get("[data-product-id='1']").eq(0).should("be.visible").click();
      });
    cy.get(".modal-content").should("be.visible");
    cy.get(".modal-content h4").should("have.text", "Added!");
    cy.get(".close-modal").should("be.visible").click();
    // Add another product to the cart
    cy.get(".product-image-wrapper")
      .eq(1)
      .within(() => {
        cy.get("[data-product-id='2']").eq(0).should("be.visible").click();
      });
    cy.get(".modal-content").should("be.visible");
    cy.get(".modal-content h4").should("have.text", "Added!");
    cy.get(".modal-body")
      .find("[href='/view_cart']")
      .should("be.visible")
      .click();
    // Verify both products are in the cart
    cy.url().should("eq", "https://automationexercise.com/view_cart");
    cy.get("#cart_info tbody tr").should("have.length", 2);
    // Remove the first product
    cy.get("#cart_info tbody tr")
      .eq(0)
      .within(() => {
        cy.get(".cart_quantity_delete>.fa-times").should("be.visible").click();
      });
    // Verify only one product remains
    cy.get("#cart_info tbody tr").should("have.length", 1);
  });
});
