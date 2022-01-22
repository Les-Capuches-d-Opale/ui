import "cypress-localstorage-commands";
describe("add adventurers", () => {
  beforeEach(() => {
    cy.login().wait(2000);
    cy.generateFixtureAdventurers();

    cy.getAdventurers();

    cy.getLocalStorage("USER").then((token) => {
      console.log(JSON.parse(token));

      cy.intercept(
        "POST",
        "https://les-capuches-d-opale.herokuapp.com/adventurers",
        {
          body: {
            name: "Batman",
            speciality: "af4c245e1d8a4f8a9d7e8c7f",
            experience: 150,
            baseDailyRate: 120,
            pictureURL:
              "https://img.huffingtonpost.com/asset/5e2ee34f240000e5020b501f.jpeg?cache=66hH6JXnKE&ops=crop_26_306_1973_1528,scalefit_630_noupscale",
          },
          headers: {
            Authorization: `Bearer ${JSON.parse(token).token}`,
          },
        }
      ).as("postAdventurers");
    });
  });

  it("should add adventurer", () => {
    cy.get(".btn-add-adventurer-cy")
      .click()
      .get(".form-add-adventurers-name-cy")
      .type("Batman")
      .get(".form-add-adventurers-tj-cy")
      .type("120")
      .get(".form-add-adventurers-xp-cy")
      .type("150")
      .get("select")
      .select("Archer")
      .get(".btn-add-cy")
      .click()
      .wait(1000)

      .wait("@postAdventurers")

      .then((res) => {
        expect(res.response.statusCode).to.equal(200);
        const body = res.request.body;

        cy.fixture("adventurers.json").then((adventurers) => {
          cy.writeFile("cypress/fixtures/adventurers.json", [
            ...adventurers,
            body,
          ]);
        });
        cy.wait(1000);
        cy.reload();
        cy.getAdventurers();
      })

      .get("table")
      .find("tr")
      .should("have.length", 7);
  });
});
