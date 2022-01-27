import "cypress-localstorage-commands";

describe("quests", () => {
  beforeEach(() => {
    cy.login().wait(1000);
    cy.generateFixturesQuests();

    cy.getQuests();
  });

  it("should see list of quests and renders 2 quests", () => {
    cy.get(".quest-label").should("have.length", 2);
  });

  it("should see details of quest", () => {
    cy.get(".quest-label")
      .first()
      .click()
      .get(".quest-details-btn-cy")
      .first()
      .click()

      .url()
      .should("include", "/quests/");
  });
});
