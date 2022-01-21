Cypress.Commands.add("awaitLoader", () => {
  return cy.getDataCy("loader", { timeout: 10000 }).should("not.exist");
});
