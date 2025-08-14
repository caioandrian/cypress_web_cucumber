import {Given, When, Then, After, Before} from 'cypress-cucumber-preprocessor/steps';

import {Acessibilidade} from '../../../pages/common';

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

Then(`deverá passar no teste de acessibilidade`, () => {
  Acessibilidade.validar_acessibilidade();
});