describe("Verify The Product Page", () => {
  beforeEach(() => {
    cy.visit("http://automationexercise.com/");
  });

  it("Navigate to Product Page and Verify Products", () => {
    cy.get("[alt = 'Website for automation practice']").should("be.visible");
    cy.get("[href='/products']")
      .should("be.visible")
      .and("contain", "Products")
      .click();
    cy.url().should("eq", "https://automationexercise.com/products");
    cy.get(".title.text-center")
      .should("be.visible")
      .and("contain.text", "All Products");
    cy.get(".features_items")
      .should("be.visible")
      .and("have.length.greaterThan", 0);
    cy.get("[href='/product_details/1']").should("be.visible").click();
    cy.url().should("eq", "https://automationexercise.com/product_details/1");
    cy.get(".product-information")
      .should("be.visible")
      .and("contain.text", "Blue Top")
      .and("contain.text", "Category: Women > Tops")
      .and("contain.text", "Rs. 500")
      .and("contain.text", "Availability: In Stock")
      .and("contain.text", "Condition: New")
      .and("contain.text", "Brand: Polo");
  });

  it("Search for a product and verify search results", () => {
    const searchKeyword = "top";
    cy.get("[href='/products']")
      .should("be.visible")
      .and("contain", "Products")
      .click();
    cy.get("#search_product")
      .should("exist")
      .and("be.empty")
      .type(searchKeyword);
    cy.get("#submit_search").should("be.visible").click();
    cy.get(".features_items")
      .should("be.visible")
      .and("contain.text", "Searched Products")
      .and("have.length.greaterThan", 0);

    cy.get(".features_items .productinfo p").each(($el) => {
      const keyword = searchKeyword.toLowerCase();
      const productName = $el.text().toLowerCase();
      if (keyword === "top") {
        // If we search 'top', we expect the name to have 'top', 't-shirt','shirt', OR 'dress'
        // We use a regular expression /.../ to check for multiple words at once
        expect(productName).to.match(/top|shirt|dress|t-shirt/);
      } else {
        // For anything else, just check if the name includes the search word
        expect(productName).to.include(keyword);
      }
    });
  });

  it.only("View category products", () => {
    cy.get("[href='/products']")
      .should("be.visible")
      .and("contain", "Products")
      .click();
    cy.get(".left-sidebar").contains("h2", "Category").should("be.visible");
    cy.get(".category-products")
      .should("be.visible")
      .and("have.length.greaterThan", 0);
    cy.get(".panel-title>[href='#Women']")
      .should("exist")
      .and("be.visible")
      .click();
    cy.get("[href='/category_products/1']").should("be.visible").click();
    cy.url().should("eq", "https://automationexercise.com/category_products/1");
    cy.get(".features_items")
      .should("be.visible")
      .and("contain.text", "Women - Dress Products")
      .and("have.length.greaterThan", 0);
    cy.get(".panel-title>[href='#Men']")
      .should("exist")
      .and("be.visible")
      .click();
    cy.get("[href='/category_products/3']").should("be.visible").click();
    cy.url().should("eq", "https://automationexercise.com/category_products/3");
    cy.get(".features_items")
      .should("be.visible")
      .and("contain.text", "Men - Tshirts Products")
      .and("have.length.greaterThan", 0);
  });

  it.only("View brand products", () => {
    cy.get("[href='/products']")
      .should("be.visible")
      .and("contain", "Products")
      .click();
    cy.get(".brands_products").contains("h2", "Brands").should("be.visible");
    cy.get(".brands_products")
      .should("be.visible")
      .and("have.length.greaterThan", 0);
    cy.get("[href='/brand_products/Polo']").should("be.visible").click();
    cy.url().should("eq", "https://automationexercise.com/brand_products/Polo");
    cy.get(".features_items")
      .should("be.visible")
      .and("contain.text", "Brand - Polo Products")
      .and("have.length.greaterThan", 0);
    cy.get("[href='/brand_products/Madame']").should("be.visible").click();
    cy.url().should(
      "eq",
      "https://automationexercise.com/brand_products/Madame",
    );
    cy.get(".features_items")
      .should("be.visible")
      .and("contain.text", "Brand - Madame Products")
      .and("have.length.greaterThan", 0);
  });
});
