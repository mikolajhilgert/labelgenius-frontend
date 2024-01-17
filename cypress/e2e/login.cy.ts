describe("My First Test", () => {
  it("Does not do much!", () => {
    expect(true).to.equal(true);
    cy.visit("https://labelgenius.vercel.app/login");
    cy.get("#email").clear();
    cy.get("#email").type("stroxvfx@gmail.com");
    cy.get("#password").clear();
    cy.get("#password").type("abc123456");
    cy.get("[data-cy=button]").click();
  });
});
