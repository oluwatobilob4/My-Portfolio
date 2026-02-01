describe("Checkout Flow", () => {
  beforeEach(() => {
    cy.visit("https://www.automationexercise.com/");
  });

  it("Place Order: Login before Checkout", () => {
    cy.get("[alt = 'Website for automation practice']").should("be.visible");
    cy.get("[href='/login']")
      .should("include.text", " Signup / Login")
      .and("be.visible")
      .click();
    cy.get(".login-form h2")
      .should("include.text", "Login to your account")
      .and("be.visible");
    cy.get("[data-qa='login-email']")
      .should("be.empty")
      .type("test@mailto.com");
    cy.get("[data-qa='login-password']").should("be.empty").type("testing");
    cy.get("[data-qa='login-button']")
      .should("be.visible")
      .and("contain", "Login")
      .click();
    cy.get(":nth-child(10) > a")
      .should("be.visible")
      .and("contain", "Logged in as Test");
    cy.get(".product-image-wrapper")
      .eq(0)
      .within(() => {
        cy.get("[data-product-id='1']").eq(0).click();
      });
    cy.get(".modal-content .btn-block")
      .should("include.text", "Continue Shopping")
      .click();
    cy.get(".product-image-wrapper")
      .eq(1)
      .within(() => {
        cy.get("[data-product-id='2']").eq(0).click();
      });
    cy.get(".modal-content .btn-block")
      .should("include.text", "Continue Shopping")
      .click();
    cy.get(".navbar-nav [href='/view_cart']").should("be.visible").click();
    cy.contains(".breadcrumbs", "Shopping Cart").should("be.visible");
    cy.get(".container .check_out").should("be.exist").click();
    cy.get("#cart_items >.container").within(() => {
      cy.get(".checkout-information").should("be.visible");
      cy.get(".cart_info").should("be.visible");
      cy.get(".form-control")
        .should("be.empty")
        .type("Testing delivery address");
      cy.get("[href='/payment']")
        .should("be.visible")
        .and("include.text", "Place Order")
        .click();
    });
    cy.contains(".step-one .heading", "Payment").should("be.visible");
    cy.get(".col-md-4 #payment-form").within(() => {
      cy.get("[name='name_on_card']").should("be.empty").type("Test");
      cy.get("[name='card_number']")
        .should("be.empty")
        .type("4242424242424242");
      cy.get("[name='cvc']").should("be.empty").type("123");
      cy.get("[name='expiry_month']").should("be.empty").type("11");
      cy.get("[name='expiry_year']").should("be.empty").type("2028");
      cy.get("[id='submit']").should("be.visible").click();
    });
    cy.get("[data-qa='order-placed']")
      .should("be.visible")
      .and("include.text", "Order Placed!");
    cy.get(".btn-primary").should("exist").click();
  });

  it.only("Download Invoice after purchase order", ()=>{
     cy.get("[alt = 'Website for automation practice']").should("be.visible");
     // login
    cy.get("[href='/login']")
      .should("include.text", " Signup / Login")
      .and("be.visible")
      .click();
    cy.get(".login-form h2")
      .should("include.text", "Login to your account")
      .and("be.visible");
    cy.get("[data-qa='login-email']")
      .should("be.empty")
      .type("test@mailto.com");
    cy.get("[data-qa='login-password']").should("be.empty").type("testing");
    cy.get("[data-qa='login-button']")
      .should("be.visible")
      .and("contain", "Login")
      .click();
    cy.get(":nth-child(10) > a")
      .should("be.visible")
      .and("contain", "Logged in as Test");
      // Adding products to cart
    cy.get(".product-image-wrapper")
      .eq(0)
      .within(() => {
        cy.get("[data-product-id='1']").eq(0).click();
      });
    cy.get(".modal-content .btn-block")
      .should("include.text", "Continue Shopping")
      .click();
    cy.get(".product-image-wrapper")
      .eq(1)
      .within(() => {
        cy.get("[data-product-id='2']").eq(0).click();
      });
    cy.get(".modal-content .btn-block")
      .should("include.text", "Continue Shopping")
      .click();
    // Navigating to cart > checkout
    cy.get(".navbar-nav [href='/view_cart']").should("be.visible").click();
    cy.contains(".breadcrumbs", "Shopping Cart").should("be.visible");
    cy.get(".container .check_out").should("be.exist").click();
    cy.get("#cart_items >.container").within(() => {
      cy.get(".checkout-information").should("be.visible");
      cy.get(".cart_info").should("be.visible");
      cy.get(".form-control")
        .should("be.empty")
        .type("Testing delivery address");
      cy.get("[href='/payment']")
        .should("be.visible")
        .and("include.text", "Place Order")
        .click();
    });
    // Checkout/payment page
    cy.contains(".step-one .heading", "Payment").should("be.visible");
    cy.get(".col-md-4 #payment-form").within(() => {
      cy.get("[name='name_on_card']").should("be.empty").type("Test");
      cy.get("[name='card_number']")
        .should("be.empty")
        .type("4242424242424242");
      cy.get("[name='cvc']").should("be.empty").type("123");
      cy.get("[name='expiry_month']").should("be.empty").type("11");
      cy.get("[name='expiry_year']").should("be.empty").type("2028");
      cy.get("[id='submit']").should("be.visible").click();
    });
    cy.get("[data-qa='order-placed']")
      .should("be.visible")
      .and("include.text", "Order Placed!");
    // downlaod the invoice
    cy.get('a.check_out[href*="/download_invoice/"]')
      .should('be.visible')
      .click();  
    cy.get(".btn-primary").should("exist").click();

    });
});
