import "./awaitLoader";
import "./login";
import "./adventurersCommands/generateFixturesAdventurers";
import "./adventurersCommands/getAdventurers";
import "./requestsCommands/generateFixturesRequests";
import "./requestsCommands/getRequests";

Cypress.on("uncaught:exception", () => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});
