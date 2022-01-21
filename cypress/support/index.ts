import "./getDataCy";
import "./awaitLoader";

beforeEach(() => {
  cy.clearCookie("acces_token");
});

Cypress.on("uncaught:exception", () => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});
