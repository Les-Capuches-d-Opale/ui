import * as faker from "@faker-js/faker";

export const generateRequest = (number: number = 2) =>
  Cypress._.times(number, () => {
    return {
      pictureUrl: `${faker.image.nature()}`,
      questGiver: `${faker.name.firstName()} ${faker.name.lastName()}`,
      name: `La requète ${faker.company.companyName()}`,
      description: `${faker.lorem.words(20)}`,
      bounty: `${faker.datatype.number()}`,
      duration: `${faker.datatype.number()}`,
      amount: `${faker.datatype.number()}`,
      awardedExperience: `${faker.datatype.number()}`,
      dataDebut: `${faker.date.future()}`,
      _id: `${faker.datatype.uuid()}`,
      requiredProfiles: [
        {
          speciality: {
            _id: "61bf9b9b0be9cf45263b6f2d",
            name: `Archer`,
            description: `${faker.lorem.words(20)}`,
          },
          experience: 0,
        },
        {
          speciality: {
            _id: "61bf9b9b0be9cf45263b6f2d",
            name: `Archer`,
            description: `${faker.lorem.words(20)}`,
          },
          experience: 0,
        },
        {
          speciality: {
            _id: "61bf9b9b0be9cf45263b6f2d",
            name: `Archer`,
            description: `${faker.lorem.words(20)}`,
          },
          experience: 0,
        },
        {
          speciality: {
            _id: "61bf9b9b0be9cf45263b6f2d",
            name: `Archer`,
            description: `${faker.lorem.words(20)}`,
          },
          experience: 0,
        },
      ],
    };
  });

Cypress.Commands.add("generateFixturesRequests", () => {
  return cy.writeFile("cypress/fixtures/requests.json", {
    counts: 2,
    requests: generateRequest(),
  });
});
