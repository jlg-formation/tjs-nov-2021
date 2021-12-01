/// <reference types="cypress" />

describe("Gestion Stock", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("should add and remove an article", () => {
    cy.get("header").contains("Gestion Stock");

    cy.get("main").contains("Voir le stock").click();
    cy.get("main").get("[aria-label=Ajouter]").click();

    const uuid = () => Cypress._.random(0, 1e6);
    const id = uuid();
    const testname = `Pince ${id}`;
    cy.get("input[name=name]").type("{selectall}" + testname);
    cy.get("input[name=price]").type("{selectall}4.56");
    cy.get("input[name=qty]").type("{selectall}567");
    cy.get("main").get("form").contains("Ajouter").click();
    cy.get("tbody").contains(testname).click();

    cy.get("main").get("[aria-label='Supprimer']").click();
  });
});
