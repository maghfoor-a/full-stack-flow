import cypress from "cypress";
import { frontendURL } from "../../src/utils/frontendURL";

describe("Visit add resources page and submit a resource", () => {
  it("visits home page and routes to resources page", () => {
    cy.visit(frontendURL);
    cy.get("select").select(1);
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
describe("Guests cannot add resource", () => {
  it("stops guest going to add resource page", () => {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit(frontendURL);
    cy.get(".navbarAddresource").click();
    cy.contains("Please sign in to add a resource");

    /* ==== End Cypress Studio ==== */
  });
  it("Guests cannot submit a resource", () => {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit("localhost:3000/addResource");
    cy.get(".resourceName").type("Cypress test intro");
    cy.get(".resourceName").type("Cypress test intro");
    cy.get(".resourceDescription").type("Documentation for cypress");
    cy.get(".resourceDescription").type("Documentation for cypress");
    cy.get(".resourceAuthorName").type("Cypress.io");
    cy.get(".resourceAuthorName").type("Cypress.io");
    cy.get(".resourceLink").type(
      "https://docs.cypress.io/guides/getting-started/opening-the-app"
    );
    cy.get(".resourceLink").type(
      "https://docs.cypress.io/guides/getting-started/opening-the-app"
    );
    cy.get(".resourceContentType").type("Documentation");
    cy.get(".resourceContentType").type("Documentation");
    cy.get(".resourceRecommendation").select(
      "I recommend this resource after having used it!"
    );
    cy.get(".resourceReason").type("Really useful and clear documentation");
    cy.get(".resourceReason").type("Really useful and clear documentation");
    cy.get(".resourceTag-TS").check();
    cy.get(".resourceTag-React").check();
    cy.get(".resourceTag-APIs").check();
    cy.get(".resourceTag-Node").check();
    cy.get("button").click();
    cy.contains("Sign in to submit resource");
    /* ==== End Cypress Studio ==== */
  });
});

describe("guest cannot submit comments", () => {
  it("Guest are prompted to sign in to submit a comment", () => {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit("localhost:3000/");
    cy.get(
      ":nth-child(5) > .resourceSummary > .resource-info > .resourceButton"
    ).click();
    cy.get('[placeholder="comment here"]').type("Hello");
    cy.get(".comment-section > div > h1").click();
    cy.get("#root > :nth-child(2)").click();
    cy.get('[type="submit"]').click();
    cy.get(
      ":nth-child(2) > .Toastify > .Toastify__toast-container > #\\31  > .Toastify__toast-body > div"
    ).should("have.text", "Sign in to submit comment");
    /* ==== End Cypress Studio ==== */
  });
});
