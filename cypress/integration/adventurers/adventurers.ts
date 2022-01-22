describe("adventurers", () => {
  beforeEach(() => {
    cy.login().wait(2000);
    cy.generateFixtureAdventurers();

    cy.intercept("GET", "/adventurers", {
      fixture: "adventurers",
    }).as("getAdventurers");

    cy.visit("/adventurers");

    cy.wait("@getAdventurers").then((a) => console.log(a));
  });

  it("should see list of adventuvers and renders 5 adventurers", () => {
    // 5 adventurers + 1 tr in thead (thanks Rainbow UI)
    cy.get("table").find("tr").should("have.length", 6);
  });
});
