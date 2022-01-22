import "./awaitLoader";
import "./login";
import "./generateFixturesAdventurers";
import "./generateFixturesSpecialities";
import "./getAdventurers";

Cypress.on("uncaught:exception", () => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});
