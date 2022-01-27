Cypress.Commands.add("login", () => {
  return cy
    .visit("/")
    .get(".login-email-cy")
    .type("valide@email.com")
    .get(".login-password-cy")
    .type("password-123")
    .get(".login-btn-cy")
    .click();
});
