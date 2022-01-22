import "cypress-localstorage-commands";
describe("reject adventurers", () => {
  beforeEach(() => {
    cy.login().wait(1000);
  });

  it("should refused request", () => {
    cy.get(".reject-btn-cy")
      .first()
      .click()
      .get(".valid-modale-cy")
      .should("be.visible")
      .get(".valid-btn-cy")
      .click()
      .reload()
      .get(".rejected-request-cy")
      .should("be.visible");
  });
});
