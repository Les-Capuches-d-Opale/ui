import "./awaitLoader";
import "./login";
import "./adventurersCommands/generateFixturesAdventurers";
import "./adventurersCommands/getAdventurers";
import "./requestsCommands/generateFixturesRequests";
import "./requestsCommands/getRequests";
import "./questsCommands/getQuests";
import "./questsCommands/generateFixturesQuests";

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.dataCy('greeting')
       */
      awaitLoader(): Chainable<Element>;
      login(): Chainable<Element>;
      generateFixturesAdventurers(): Chainable<Element>;
      getAdventurers(): Chainable<Element>;
      generateFixturesRequests(): Chainable<Element>;
      getRequests(): Chainable<Element>;
      getQuests(): Chainable<Element>;
      generateFixturesQuests(): Chainable<Element>;
    }
  }
}

Cypress.on("uncaught:exception", () => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});
