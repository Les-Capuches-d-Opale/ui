describe("logout", () => {
  it("should logout on click", () => {
    cy.visit("/")
      .login()
      .get(".signout-cy")
      .click()
      .url()
      .should("include", "/login");
  });
});
