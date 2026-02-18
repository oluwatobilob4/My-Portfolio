describe("HomePage Test Suite", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get(".brand").then(($el) => {
      const brandname = $el.text();
      expect(brandname).to.equal("GREENKART");
    });
  });
  it("Verify the links at the top bar", () => {
    //Click on the first link on the navbar
    cy.get('[href="#/offers"]')
      .should("be.visible")
      .and("have.text", "Top Deals")
      .invoke("removeAttr", "target")
      .click();
    cy.url().should("include", "/offers");

    // the table itself should appear on the page
    cy.get("table")
      .should("be.visible")
      .within(() => {
        // ensure header row exists and has exactly three specific columns
        cy.get("thead tr th").then(($ths) => {
          expect($ths).to.have.length(3);
        });
        // loop through each item to verify it is not empty
        cy.get("tbody tr").each(($row) => {
          cy.wrap($row)
            .find("td")
            .each((item) => {
              const rowItem = item.text();
              expect(rowItem).not.to.equal("");
            });
        });
      });
    // Go back to the homepage and verify the user is redirected to the homepage
    cy.go("back");
    cy.url().should("eq", "https://rahulshettyacademy.com/seleniumPractise/#/");

    // Click on the next link
    cy.get('[href="https://rahulshettyacademy.com/dropdownsPractise/"]')
      .should("have.text", "Flight Booking")
      .and(
        "have.attr",
        "href",
        "https://rahulshettyacademy.com/dropdownsPractise/",
      );
    cy.get(".cart-icon").should("be.visible").click();
    cy.get(".cart-preview")
      .should("be.visible")
      .and("contain.text", "You cart is empty!");
  });

  it.only("Verify the products displayed on the homepage", () => {
    cy.wait(5000); // wait for the products to successfully load

    // Verify the products are displayed and assert it displays the right details
    cy.get(".products .product:visible")
      .should("have.length.above", 0)
      .each(($el) => {
        cy.wrap($el).within(() => {
          cy.get(".product-image")
            .find("img")
            .should("be.visible")
            .and("have.attr", "src")
            .and("include", "./images");
          cy.get(".product-name").should("not.be.empty");
          cy.get(".product-price").should("not.be.empty");
          cy.get(".quantity").should("have.value", 1);
          cy.get('[type="button"]')
            .should("be.visible")
            .and("have.text", "ADD TO CART")
            .and("have.css", "background-color", "rgb(7, 121, 21)");
        });
      });
  });

  it.only("Verify the footer section", () => {
    cy.get(".container footer")
      .scrollIntoView()
      .should("be.visible")
      .and("have.css", "background-color", "rgb(221, 221, 221)")
      .within(() => {
        cy.contains("© 2019 ").should("be.visible");
        cy.get("strong").should("have.text", "GreenKart").and("be.visible");
        cy.contains(" - buy veg and fruits online").should("be.visible");
      });
  });
});
