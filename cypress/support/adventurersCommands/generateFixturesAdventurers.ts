import * as faker from "@faker-js/faker";

export const generateAdventurers = (number: number = 5) =>
  Cypress._.times(number, () => {
    return {
      pictureUrl: `${faker.image.nature()}`,
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      experience: `${faker.datatype.number()}`,
      baseDailyRate: `${faker.datatype.number()}`,
      amount: `${faker.datatype.number()}`,
      _id: `${faker.datatype.uuid()}`,
      speciality: {
        name: `${faker.animal.type()}`,
        description: `${faker.lorem.words(20)}`,
        _id: `${faker.datatype.uuid()}`,
      },
    };
  });

Cypress.Commands.add("generateFixturesAdventurers", () => {
  return cy.writeFile(
    "cypress/fixtures/adventurers.json",
    generateAdventurers()
  );
});
