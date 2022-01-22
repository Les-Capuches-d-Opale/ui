describe("adventurers", () => {
  it.skip("should add adventurer", () => {
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
        console.log("a", res);
        const body = res.request.body;
        // cy.fixture("adventurers.json").then((data) => {
        //   console.log("data", data);
        //   data.push(body);
        // });

        // cy.fixture("adventurers").as("adventurers");
        // cy.request(
        //   "POST",
        //   "https://les-capuches-d-opale.herokuapp.com/adventurers",
        //   body
        // );

        cy.fixture("adventurers.json").then((adventurers) => {
          // the index k will be from 0 to users.length - 1
          const k = Cypress._.random(adventurers.length - 1);
          expect(k, "random user index").to.be.within(
            0,
            adventurers.length - 1
          );
          const testUser = adventurers[k];

          // we need to send the entire database object
          cy.request("POST", "/adventurers", {
            adventurers: [testUser],
          });
        });
      })

      .get("table")
      .find("tr")
      .should("have.length", 7);
  });
});
