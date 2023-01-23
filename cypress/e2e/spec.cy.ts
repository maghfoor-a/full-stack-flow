import cypress from "cypress";
import { frontendURL } from "../../src/utils/frontendURL";

describe("Visit add resources page and submit a resource", () => {
  it("visits home page and routes to resources page", () => {
    cy.visit(frontendURL);

    cy.contains("Add Resource!").click();

    cy.url().should("include", "/addresource");
  });
  it("submits resources form", () => {
    cy.visit(frontendURL + "addresource");
    cy.get(".resourceName").type("Cypress test intro");
    cy.get(".resourceDescription").type("Documentation for cypress");
    cy.get(".resourceAuthorName").type("Cypress.io");
    cy.get(".resourceLink").type(
      "https://docs.cypress.io/guides/getting-started/opening-the-app"
    );
    cy.get(".resourceContentType").type("Documentation");
    cy.get(".resourceRecommendation").select(
      "I recommend this resource after having used it!"
    );
    cy.get(".resourceReason").type("Really useful and clear documentation");
    cy.get(".resourceTag-TS").click();
    cy.intercept("POST", "/resources").as("resource submitted!");
    cy.get("form").submit();
  });
  
});
