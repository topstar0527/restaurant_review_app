describe("Form test", () => {
    it("Can fill the form", () => {
        cy.visit("/register");
        cy.get("form");

        cy.get('input[name="firstname"]')
        .type("jason")
        .should("have.value", "jason");

        cy.get('input[name="lastname"]')
        .type("jackson")
        .should("have.value", "jackson");

        cy.get('input[name="username"]')
        .type("jasonjackson")
        .should("have.value", "jasonjackson");

        cy.get('input[name="password"]')
        .type("123123")
        .should("have.value", "123123");

        cy.get('input[name="confirm"]')
        .type("123123")
        .should("have.value", "123123");

        cy.get("form").submit();
    });
  });