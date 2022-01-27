Cypress.Commands.add("getQuests", () => {
  cy.intercept("GET", "https://les-capuches-d-opale.herokuapp.com/quests", {
    fixture: "quests",
  }).as("getQuests");

  cy.visit("/quests").awaitLoader();

  cy.wait("@getQuests");
});
