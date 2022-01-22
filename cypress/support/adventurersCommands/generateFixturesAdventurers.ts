import * as faker from "@faker-js/faker";

Cypress.Commands.add("generateFixturesAdventurers", () => {
  const adventurers = () =>
    Cypress._.times(5, () => {
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

  return cy.writeFile("cypress/fixtures/adventurers.json", adventurers());
});
