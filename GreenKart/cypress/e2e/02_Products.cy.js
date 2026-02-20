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

  it("Increasing Product Quantity Using the Increment button and Add the Product to Cart", () => {
    let price = 0;
    let cartCount = 0;

    cy.get(".products .product:visible")
      .its("length")
      .then((length) => {
        const index = Math.floor(Math.random() * length);

        // work with a randomly selected product
        cy.get(".product:visible")
          .eq(index)
          .within(() => {
            // grab the unit price as a number
            cy.get(".product-price")
              .invoke("text")
              .then((text) => {
                const amount = parseFloat(text.replace(/[^0-9.]/g, ""));

                // increase quantity, then read the input's value (not its text)
                cy.get(".increment").should("be.visible").click();
                cy.get(".quantity")
                  .should("have.value", "2")
                  .invoke("val")
                  .then((val) => {
                    const increase = parseInt(val);

                    // add to cart after quantity is known
                    cy.get('[type="button"]').click();
                    cy.contains("✔ ADDED")
                      .should("be.visible")
                      .and("have.css", "background-color", "rgb(252, 119, 16)");

                    cartCount += 1;
                    price = amount * increase;
                  });
              });
          });

        // verify cart info reflects the selection
        cy.then(() => {
          cy.get(".cart-info td").eq(2).should("have.text", cartCount);
          cy.get(".cart-info td").eq(5).should("have.text", price);
        });
      });
  });

  it("Increasing the product quantity by inputting the value ", () => {
    let cartCount = 0;
    let price = 0;

    cy.get(".products .product:visible")
      .its("length")
      .then((length) => {
        const index = Math.floor(Math.random() * length);
        // Using the random product
        cy.get(".product:visible")
          .eq(index)
          .within(() => {
            // grab the unit price as a number
            cy.get(".product-price")
              .invoke("text")
              .then((text) => {
                const amount = parseFloat(text.replace(/[^0-9.]/g, ""));
                // Increasing the quantity by typing into the input and reading its value
                cy.get(".quantity").should("have.value", 1).clear().type("3");
                cy.get(".quantity")
                  .invoke("val")
                  .then((val) => {
                    const increase = parseInt(val);

                    // add to cart after quantity is known
                    cy.get('[type="button"]').click();
                    cy.contains("✔ ADDED")
                      .should("be.visible")
                      .and("have.css", "background-color", "rgb(252, 119, 16)");

                    cartCount += 1;
                    price = amount * increase;
                  });
              });
          });
        cy.then(() => {
          cy.get(".cart-info td").eq(2).should("have.text", cartCount);
          cy.get(".cart-info td").eq(5).should("have.text", price);
        });
      });
  });

  it("Add products to cart and proceed to checkout", () => {
    // adding prodcuts cart
    cy.addToCart();

    // Proceed to checkout
    cy.contains("button", "PROCEED TO CHECKOUT")
      .should("be.visible")
      .and("have.css", "background-color", "rgb(252, 119, 16)")
      .click();

    // verify the user is redirected to checkout and proced to pay
    cy.url().should(
      "eq",
      "https://rahulshettyacademy.com/seleniumPractise/#/cart",
    );
    cy.get("tbody tr").should("have.length", 4);
    cy.contains("button", "Place Order")
      .should("have.css", "background-color", "rgb(7, 121, 21)")
      .click();

    // Finalize payment
    cy.url().should("include", "/country");
    cy.get("label").should("have.text", "Choose Country");
    cy.get("select option:not([disabled])")
      .its("length")
      .then((length) => {
        const randomCountry = Math.floor(Math.random() * length);
        cy.get("select").select(randomCountry, { force: true });
        cy.get(".chkAgree").check();
        cy.contains("button", "Proceed")
          .should("have.css", "background-color", "rgb(7, 121, 21)")
          .click();
        cy.wait(2000);
        // assert the order was successful and the user redirected to homepage
        cy.contains(
          "Thank you, your order has been placed successfully You'll be redirected to Home page shortly!!",
          { timeout: 10000 },
        ).should("be.visible");
        cy.url().should(
          "eq",
          "https://rahulshettyacademy.com/seleniumPractise/#/",
        );
      });
  });

  it("Delete Item in cart", () => {
    // add products to cart and open preview
    cy.addToCart();

    // grab the current number of items shown in the cart preview
    cy.get(".cart-preview .cart-item")
      .should("be.visible")
      .then(($items) => {
        const initialCount = $items.length;

        // remove a random item from the preview
        const removeIndex = Math.floor(Math.random() * initialCount);
        cy.get(".cart-preview .product-remove").eq(removeIndex).click();

        // after deletion the preview should have one less item
        cy.get(".cart-preview .cart-item").should(
          "have.length",
          initialCount - 1,
        );

        // also verify the cart count indicator updates accordingly
        cy.get(".cart-info td")
          .eq(2)
          .should("have.text", initialCount - 1);
      });
  });
});
