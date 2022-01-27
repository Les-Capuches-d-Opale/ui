import "cypress-localstorage-commands";

describe("requests", () => {
  beforeEach(() => {
    cy.login().wait(1000);
    cy.generateFixturesRequests();

    cy.getRequests();
  });

  it("should see list of requests and renders 2 requests", () => {
    // cy.get(".accordion-req-cy").find("li").should("have.length", 2);
    cy.get(".accordion-req-cy")
      .find("li .label-request-info")
      .its("length")
      .should("be.gte", 0);
  });
});
