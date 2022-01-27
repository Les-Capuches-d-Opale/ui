import * as faker from "@faker-js/faker";
import { generateAdventurers } from "../adventurersCommands/generateFixturesAdventurers";
import { generateRequest } from "../requestsCommands/generateFixturesRequests";

Cypress.Commands.add("generateFixturesQuests", () => {
  const quests = () =>
    Cypress._.times(2, () => {
      return {
        request: generateRequest(1)[0],
        groups: generateAdventurers(),
      };
    });

  return cy.writeFile("cypress/fixtures/quests.json", {
    counts: 2,
    quests: quests(),
  });
});
