import "cypress-localstorage-commands";

describe("adventurers", () => {
  beforeEach(() => {
    cy.login().wait(1000);
    cy.generateFixturesAdventurers();

    cy.getAdventurers();
  });

  it("should see list of adventuvers and renders 5 adventurers", () => {
    // 5 adventurers + 1 tr in thead (thanks Rainbow UI)
    cy.get("table").find("tr").should("have.length", 6);
  });
});
