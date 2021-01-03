/// <reference types="cypress" />

describe("My First Test", () => {
  it("Check if main header is present", () => {
    cy.visit("http://localhost:3000/");
    cy.get('h1[data-cypress-id = "mainHeader"]').should(
      "contain.text",
      "Tested To-Do List"
    );
  });

  it("Check if task can be added", () => {
    cy.get('input[data-cypress-input="create-input"]').type(
      "Task Made By Cypress"
    );
    cy.get('button[data-cypress-button="create-button"').click();
  });

  it("Check if task is present in page", () => {
    cy.get('li[data-cypress-taskname = "Task Made By Cypress"]')
      .should("not.be.empty")
      .should("contain.text", "Task Made By Cypress");
  });

  it("Check if delete functionality works", () => {
    cy.get(
      'button[data-cypress-button-delete-taskname = "Task Made By Cypress"]'
    ).click();
    cy.get('li[data-cypress-taskname = "Task Made By Cypress"]').should(
      "not.exist"
    );
  });

  it("Check if update functionality works", () => {
    const taskName = "Task Made By Cypress To Be Updated";
    const updatedTaskName = "This Task Should Be Updated";
    cy.get('input[data-cypress-input="create-input"]').type(taskName);
    cy.get('button[data-cypress-button="create-button"').click();

    cy.get(
      `button[data-cypress-button-update-taskname = "${taskName}"]`
    ).click();
    cy.get(`input[ data-cypress-input-taskname = "${taskName}"]`).type(
      updatedTaskName
    );
    cy.get(
      `button[data-cypress-button-update-taskname = "${taskName}"]`
    ).click();

    cy.get(`li[data-cypress-taskname = "${updatedTaskName}"]`).should(
      "contain.text",
      updatedTaskName
    );
  });
});
