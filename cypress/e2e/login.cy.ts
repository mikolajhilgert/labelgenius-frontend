describe("Login test", () => {
  it("We test the login", () => {
    cy.visit("https://labelgenius.vercel.app/login");
    cy.get("#email").clear();
    cy.get("#email").type("stroxvfx@gmail.com");
    cy.get("#password").clear();
    cy.get("#password").type("abc123456");
    cy.get("[data-cy=button]").click();
    cy.wait(1000);
    cy.get("[data-cy=button]").should("not.exist");
  });
});
