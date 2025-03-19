///<reference types = 'cypress'/>
// Enables Cypress IntelliSense in IDEs for autocompletion and type checking.

describe("DemoQA Buttons Test Suite", () => {
  // Positive test: Valid interactions
  it("Validates successful button interactions", () => {
    cy.visit("https://demoqa.com/");
    // Selected the first child from the parent class and performed a click action
    cy.get(".category-cards > :nth-child(1)").click();
    // Robust navigation via text content
    cy.contains("Buttons").click();
    // URL Assertion: validates correct page routing
    cy.url().should("eq", "https://demoqa.com/buttons");
    // Explicitly asserts page header content
    cy.get("h1.text-center").should("contain", "Buttons");
    //cy.get('h1.text-center').contains('Buttons').should('contain','Buttons');

    // Button Interaction Tests
    cy.get("#doubleClickBtn").dblclick();
    cy.get("#rightClickBtn").rightclick();
    // click multiple elements by passing multiple: true
    cy.get('button.btn.btn-primary:contains("Click Me")').click({
      multiple: true,
    });

    // Performing assertion and comprehensive validation of UI feedback
    cy.get("p#doubleClickMessage")
      .should("be.visible")
      .and("contain", "You have done a double click");
    cy.get("p#rightClickMessage")
      .should("be.visible")
      .and("contain", "You have done a right click");
    cy.get("p#dynamicClickMessage")
      .should("be.visible")
      .and("contain", "You have done a dynamic click");
  });

  // Negative Test: Validates resilience against invalid interactions
  it("Verifies failure scenarios for button interactions", () => {
    // Setup duplicated from positive test: DRY violation.
    // ! Refactor into `beforeEach` hook to reduce redundancy.
    cy.visit("https://demoqa.com/");
    cy.get(".category-cards > :nth-child(1)").click();
    cy.contains("Buttons").click();
    cy.url().should("eq", "https://demoqa.com/buttons");
    //cy.get('h1.text-center').contains('Buttons').should('contain','Buttons');
    cy.get("h1.text-center").should("contain", "Buttons");

    // Invalid Actions for a Single-click on double-click button
    cy.get("#doubleClickBtn").click();
    // Invalid Actions for a Single-click on right-click button
    cy.get("#rightClickBtn").click();
    // Invalid Actions for a Right-click on dynamic click button  // Target by text content
    cy.contains("button", "Click Me").rightclick(); // Or this cy.get('button').contains('Click Me').rightclick();

    // Performing assertion and comprehensive validation of UI feedback
    cy.get("p#doubleClickMessage").should("not.exist");
    cy.get("p#rightClickMessage").should("not.exist");
    cy.get("p#dynamicClickMessage").should("not.exist");
  });
});
