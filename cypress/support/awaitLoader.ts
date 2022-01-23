Cypress.Commands.add("awaitLoader", () => {
  cy.get(".loader-cy", { timeout: 10000 }).should("not.exist");
});
