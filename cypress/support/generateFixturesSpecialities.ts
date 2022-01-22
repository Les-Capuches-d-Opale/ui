import * as faker from "@faker-js/faker";

Cypress.Commands.add("generateFixturesSpecialties", () => {
  return cy.writeFile("cypress/fixtures/specialties.json", {
    hits: Cypress._.times(4, () => {
      return {
        name: `${faker.animal.type()}`,
        description: `${faker.lorem.words(20)}`,
      };
    }),
  });
});
