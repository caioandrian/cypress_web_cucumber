import Element from './element.js';

export default class Navigation {
  static visit(path = "", timeout = 90000) {
    cy.visit(path, { timeout: timeout });
  }

  static reloadPage() {
    cy.reload();
  }

  static scrollIntoView(elementID, index = undefined) {
    Element.getElement(elementID, index).scrollIntoView({offset: { top: -window.innerHeight / 2, left: 0 }});
  }

  static scrollToBottomOfElement(elementID, index = undefined) {
    Element.getElement(elementID, index).scrollTo('bottom');
  }

  static scrollToTopOfElement(elementID, index = undefined) {
    Element.getElement(elementID, index).scrollTo('top');
  }

  static getUrl() {
    return cy.url({ timeout: Cypress.env('global_timeout')});
  }
}
