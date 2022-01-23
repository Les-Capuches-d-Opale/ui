import "cypress-localstorage-commands";
describe("reject adventurers", () => {
  beforeEach(() => {
    cy.login().wait(1000);
  });

  it("should refused request", () => {
    cy.get("body")
      .then(($body) => {
        if ($body.find(".valid-modale-cy").length) {
          return ".valid-modale-cy";
        }

        return ".rejected-request-cy";
      })
      .then((selector) => {
        if (selector === ".valid-modale-cy") {
          cy.get(selector)
            .first()
            .click()
            .get(".valid-modale-cy")
            .should("be.visible")
            .get(".valid-btn-cy")
            .click()
            .reload()
            .get(".rejected-request-cy")
            .should("be.visible");
        } else {
          cy.get(selector).should("be.visible");
        }
      });
  });
});
