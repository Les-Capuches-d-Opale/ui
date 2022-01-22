import "cypress-localstorage-commands";
describe("add adventurers", () => {
  beforeEach(() => {
    cy.login().wait(1000);
    cy.generateFixturesRequests();

    cy.getRequests();

    cy.getLocalStorage("USER").then((token) => {
      console.log(JSON.parse(token));

      cy.intercept(
        "POST",
        "https://les-capuches-d-opale.herokuapp.com/requests",
        {
          body: {
            name: "Go to the forest",
            description: "I need more 500 stacks of oak wood to build a table",
            pictureUrl: "https://picsum.photos/200/300",
            questGiver: "Moi",
            bounty: 5000,
            duration: 172800,
            requiredProfiles: [
              {
                speciality: "61bf9b9b0be9cf45263b6f2d",
                experience: 4,
              },
            ],
            awardedExperience: 12,
            dateDebut: new Date(),
          },
          headers: {
            Authorization: `Bearer ${JSON.parse(token).token}`,
          },
        }
      ).as("postRequest");
    });
  });

  it("should add request", () => {
    cy.get(".btn-add-request-cy")
      .click()
      .get(".form-add-request-name-cy")
      .type("Go to the forest")
      .get(".form-add-request-giver-cy")
      .type("Moi")
      .get(".form-add-request-desc-cy")
      .type("I need more 500 stacks of oak wood to build a table")
      .get(".form-add-request-prime-cy")
      .type("5000")
      .get(".form-add-request-axp-cy")
      .type("12")
      .get(".form-add-request-duration-cy")
      .type("2")
      .get("select")
      .select("Archer")
      .get(".form-add-request-xp-cy")
      .type("4")
      .get(".btn-add-req-profile")
      .click()
      .get(".badge-add-req-profile-cy")
      .should("have.length", 1)
      .should("be.visible")
      .contains("Archer 4XP")
      .get(".badge-del-req-profile-cy")
      .click()
      .get(".badge-add-req-profile-cy")
      .should("not.exist")
      .get("select")
      .select("Archer")

      .get(".btn-add-req-profile")
      .click()
      .get(".btn-add-cy")
      .click()

      .wait("@postRequest")

      .then((res) => {
        expect(res.response.statusCode).to.equal(200);
        const body = res.request.body;

        cy.fixture("requests.json").then((requests) => {
          cy.writeFile("cypress/fixtures/requests.json", {
            counts: 3,
            requests: [...requests.requests, body],
          });
        });
        cy.reload();
        cy.getRequests();
      })

      .get(".accordion-req-cy")
      .find("li")
      .should("have.length", 3);
  });
});
