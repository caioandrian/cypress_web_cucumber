import {Given, When, Then, After, Before} from 'cypress-cucumber-preprocessor/steps';

before(() => {
});

beforeEach(() => {
  cy.clearLocalStorage();
  cy.clearCookies();
  if (window.navigator && navigator.serviceWorker) {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      registrations.forEach((registration) => {
        registration.unregister();
      });
    });
  }
});