Cypress.Commands.add("getAdventurers", () => {
  cy.intercept(
    "GET",
    "https://les-capuches-d-opale.herokuapp.com/adventurers",
    {
      fixture: "adventurers",
    }
  ).as("getAdventurers");

  cy.visit("/adventurers");

  cy.wait("@getAdventurers").then((a) => console.log(a));
});
