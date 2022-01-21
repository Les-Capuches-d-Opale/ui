Cypress.Commands.add("awaitLoader", () => {
  return cy.get(".loader-cy", { timeout: 10000 }).should("not.exist");
});
