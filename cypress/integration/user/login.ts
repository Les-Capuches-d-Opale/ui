describe("login", () => {
  it("should no log if wrong credential", () => {
    cy.visit("/")
      .url()
      .should("include", "/login")
      .get(".login-email-cy")
      .type("fake@mail.com")
      .get(".login-password-cy")
      .type("fake-password")
      .get(".login-btn-cy")
      .click()
      .url()
      .should("include", "/login")
      .get(".login-wrong-credential-cy")
      .should("be.visible");
  });
  it("should log if good credential", () => {
    cy.visit("/")
      .get(".login-email-cy")
      .type("valide@email.com")
      .get(".login-password-cy")
      .type("password-123")
      .get(".login-btn-cy")
      .click()
      .url()
      .should("include", "/requests");
  });
});
