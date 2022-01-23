Cypress.Commands.add("getRequests", () => {
  cy.intercept("GET", "https://les-capuches-d-opale.herokuapp.com/requests", {
    fixture: "requests",
  }).as("getRequests");

  cy.visit("/").awaitLoader();

  cy.wait("@getRequests");
});
