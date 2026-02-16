describe("Cart and Checkout Test", () => {
  beforeEach(() => {
    // login before each test
    cy.loginSession("Testilo", "Testing");
    cy.visit("/");
  });

  it("Add product to cart and verify cart contents", () => {
    cy.get("#tbodyid .card")
      .should("be.visible")
      .and("have.length.at.least", 1)
      .its("length")
      .then((length) => {
        const randomIndex = Math.floor(Math.random() * length);
        // Add the first product to cart
        cy.get("#tbodyid .card")
          .eq(randomIndex)
          .within(() => {
            cy.get(".card-title a").click({ force: true });
          });
        cy.url().should("include", "prod.html");
        cy.wait(1000); // Wait for product details to load
        cy.get(".product-wrap .name").should("be.visible").and("not.be.empty");
        cy.get(".product-wrap .price-container")
          .should("be.visible")
          .and("not.be.empty");
        cy.get(".product-wrap .description")
          .should("be.visible")
          .and("not.be.empty");
        // Add a listener for the alert and verify its content
        cy.on("window:alert", (str) => {
          expect(str).to.equal("Product added.");
        });
        cy.get(`[onclick='addToCart(${randomIndex + 1})']`)
          .should("be.visible")
          .and("have.css", "background-color", "rgb(52, 168, 83)")
          .and("contain", "Add to cart")
          .click({ force: true });
        cy.wait(1000); // Wait for the alert to be handled
        // Go to homepage and add a second product to cart
        cy.get(".nav-item [href='index.html'] ")
          .should("be.visible")
          .click({ force: true });
        cy.get("#tbodyid .card")
          .should("be.visible")
          .and("have.length.at.least", 1)
          .its("length")
          .then((length) => {
            // Add second product to cart
            const secondRandomIndex = Math.floor(Math.random() * length);
            cy.get("#tbodyid .card")
              .eq(secondRandomIndex)
              .within(() => {
                cy.get(".card-title a").click({ force: true });
              });
            cy.url().should("include", "prod.html");
            cy.wait(1000); // Wait for product details to load
            cy.get(".product-wrap .name")
              .should("be.visible")
              .and("not.be.empty");
            cy.get(".product-wrap .price-container")
              .should("be.visible")
              .and("not.be.empty");
            cy.get(".product-wrap .description")
              .should("be.visible")
              .and("not.be.empty");
            // Add a listener for the alert and verify its content
            cy.on("window:alert", (str) => {
              expect(str).to.equal("Product added.");
            });
            cy.get(`[onclick='addToCart(${secondRandomIndex + 1})']`)
              .should("be.visible")
              .and("have.css", "background-color", "rgb(52, 168, 83)")
              .and("contain", "Add to cart")
              .click({ force: true });
            cy.wait(1000); // Wait for the alert to be handled
            // Go to cart and verify contents
          });
        // Go to cart and verify contents
        cy.get("#cartur").should("be.visible").click({ force: true });
        cy.url().should("include", "cart.html");
        cy.get("#page-wrapper h2")
          .should("be.visible")
          .and("include.text", "Products");
        cy.get("#tbodyid tr")
          .should("have.length", 2)
          .each(($el) => {
            cy.wrap($el).within(() => {
              cy.get("td").eq(1).should("be.visible").and("not.be.empty");
              cy.get("td").eq(2).should("be.visible").and("not.be.empty");
            });
            cy.get("#totalp").should("be.visible").and("not.be.empty");
          });
      });
  });

  it.skip("Remove product from cart and verify the cart is updated", () => {
    // Go to cart and remove products
    cy.get("#cartur").should("be.visible").click({ force: true });
    cy.url().should("include", "cart.html");
    cy.get("#page-wrapper h2")
      .should("be.visible")
      .and("include.text", "Products");
    cy.get("#tbodyid tr").then(($rows) => {
      const rowCount = $rows.length;
      // Remove the first product
      cy.get("#tbodyid tr")
        .first()
        .within(() => {
          cy.get("td")
            .eq(3)
            .find("a")
            .should("be.visible")
            .and("have.css", "color", "rgb(2, 117, 216)")
            .and("contain", "Delete")
            .click({ force: true });
        });
      cy.wait(1000); // Wait for cart to update
      // Verify the product is removed
      cy.get("#tbodyid tr").should("have.length", rowCount - 1);
    });
  });

  it("Complete checkout process", () => {
    var sum = 0;
    // Go to cart and complete checkout
    cy.get("#cartur").should("be.visible").click({ force: true });
    cy.url().should("include", "cart.html");
    cy.wait(1000); // Wait for cart contents to load
    cy.get("#page-wrapper h2")
      .should("be.visible")
      .and("include.text", "Products");
    cy.get("#tbodyid tr")
      .should("have.length.at.least", 1)
      .each(($el) => {
        const amount = parseFloat($el.find("td").eq(2).text());
        sum = sum + amount;
      });
    cy.get("#totalp")
      .should("be.visible")
      .and("not.be.empty")
      .then((total) => {
        const totalAmount = parseFloat(total.text());
        expect(totalAmount).to.equal(sum);
      });
    // Place order
    cy.get("#page-wrapper .btn-success")
      .should("be.visible")
      .and("contain", "Place Order")
      .and("have.css", "background-color", "rgb(52, 168, 83)")
      .click({ force: true });
    cy.get("#orderModal .modal-content")
      .should("be.visible")
      .and("contain", "Place order")
      .within(() => {
        cy.get("#name").should("be.visible").and("be.empty").type("John Doe");
        cy.get("#country").should("be.visible").and("be.empty").type("USA");
        cy.get("#city").should("be.visible").and("be.empty").type("New York");
        cy.get("#card")
          .should("be.visible")
          .and("be.empty")
          .type("1234 5678 9012 3456");
        cy.get("#month").should("be.visible").and("be.empty").type("12");
        cy.get("#year").should("be.visible").and("be.empty").type("2025");
        cy.get(".btn-primary")
          .scrollIntoView()
          .should("be.visible")
          .and("have.css", "background-color", "rgb(2, 117, 216)")
          .and("have.text", "Purchase")
          .click({ force: true });
      });
    cy.get(".sweet-alert")
      .should("be.visible")
      .and("contain", "Thank you for your purchase!")
      .within(() => {
        cy.wait(1000); // Wait for the alert content to load
        cy.get(".sa-placeholder").should("be.visible");
        cy.get("p").should("be.visible").and("not.be.empty");
        cy.get(".confirm")
          .should("be.visible")
          .and("have.css", "background-color", "rgb(2, 117, 216)")
          .and("contain", "OK")
          .click({ force: true });
      });
    cy.url().should("include", "index.html");
  });
});
