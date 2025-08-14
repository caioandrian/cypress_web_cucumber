export default class Element {
  static get(value = "") {
    return cy.get(value);
  }

  static getElement(elementID, index = 0, scroll = true) {
    if(elementID.includes("//")) {
      if(scroll)
        return cy.xpath(elementID, { timeout: Cypress.env('global_timeout') }).eq(index).scrollIntoView({offset: { top: -window.innerHeight / 2, left: 0 }});
      else 
        return cy.xpath(elementID, { timeout: Cypress.env('global_timeout') }).eq(index);
    } else {
      if(scroll)
        return cy.get(elementID, { timeout: Cypress.env('global_timeout') }).eq(index).scrollIntoView({offset: { top: -window.innerHeight / 2, left: 0 }});
      else
        return cy.get(elementID, { timeout: Cypress.env('global_timeout') }).eq(index);
    }
  }

  static getElementWithoutIndex(elementID, scroll = true) {
    if(elementID.includes("//")) {
      if(scroll)
        return cy.xpath(elementID, { timeout: Cypress.env('global_timeout') }).scrollIntoView({offset: { top: -window.innerHeight / 2, left: 0 }});
      else 
        return cy.xpath(elementID, { timeout: Cypress.env('global_timeout') });
    } else {
      if(scroll)
        return cy.get(elementID, { timeout: Cypress.env('global_timeout') }).scrollIntoView({offset: { top: -window.innerHeight / 2, left: 0 }});
      else
        return cy.get(elementID, { timeout: Cypress.env('global_timeout') });
    }
  }

  static getLastElement(elementID, scroll = true) {
    if(elementID.includes("//")) {            
      if(scroll)
        return cy.xpath("(" + elementID + ") [last()]", { timeout: Cypress.env('global_timeout') }).scrollIntoView({offset: { top: -window.innerHeight / 2, left: 0 }});
      else
        return cy.xpath("(" + elementID + ") [last()]", { timeout: Cypress.env('global_timeout') });
    } else {
      if(scroll)
        return cy.get(elementID, { timeout: Cypress.env('global_timeout') }).last().scrollIntoView({offset: { top: -window.innerHeight / 2, left: 0 }});
      else
        return cy.get(elementID, { timeout: Cypress.env('global_timeout') }).last();
    }
  }

  static getElementFilterVisible(elementID, index = 0, scroll = true) {
    if(elementID.includes("//")) {
      if(scroll)
        return cy.xpath(elementID, { timeout: Cypress.env('global_timeout') }).filter(':visible').eq(index).scrollIntoView({offset: { top: -window.innerHeight / 2, left: 0 }});
      else 
        return cy.xpath(elementID, { timeout: Cypress.env('global_timeout') }).filter(':visible').eq(index);
    } else {
      if(scroll)
        return cy.get(elementID, { timeout: Cypress.env('global_timeout') }).filter(':visible').eq(index).scrollIntoView({offset: { top: -window.innerHeight / 2, left: 0 }});
      else 
        return cy.get(elementID, { timeout: Cypress.env('global_timeout') }).filter(':visible').eq(index);
    }
  }

  static getElementByFind(elementID, finder, index = undefined, scroll=undefined, indexFinder = 0) {
    return this.getElement(elementID, index, scroll).find(finder, { timeout: Cypress.env('global_timeout') }).eq(indexFinder).scrollIntoView({offset: { top: -window.innerHeight / 2, left: 0 }});
  }

  static getElementText(element, index = undefined, scroll = undefined) {
    return this.getElement(element, index, scroll).should('be.visible').invoke('text');
  }

  static getElementValue(element, index = undefined, scroll = undefined, visible = true) {
    if(visible) {
      return this.getElement(element, index, scroll).should('be.visible').invoke('val');
    } else {
      return this.getElement(element, index, scroll).invoke('val');
    }
  }

  static getElementTextFilterVisible(elementID, index = undefined, scroll = undefined) {
    return this.getElement(elementID, index, scroll, { timeout: Cypress.env('global_timeout') })
      .scrollIntoView({offset: { top: -window.innerHeight / 2, left: 0 }})
      .invoke('text');
  }

  static getElementByContainsText(text, index = 0, caseSensitive = false) {
    return cy.contains(text, { timeout: Cypress.env('global_timeout'), matchCase: caseSensitive }).eq(index).scrollIntoView({offset: { top: -window.innerHeight / 2, left: 0 }});
  }

  static getElementTextByFind(elementID, finder, index = undefined, scroll=undefined) {
    return this.getElement(elementID, index, scroll).find(finder).should('be.visible').invoke('text');
  }

  static getElementTextBySiblingsAndFinder(elementID, index = undefined, finder, indexFinder = undefined, scroll=undefined) {
    return this.getElement(elementID, index, scroll).find(finder).siblings().eq(indexFinder).invoke('text');
  }

  static getElementFilterByContainsText(elementID, text, index = undefined, scroll=undefined) {
    return this.getElement(elementID, index, scroll).contains(text).scrollIntoView({offset: { top: -window.innerHeight / 2, left: 0 }});
  }

  static getElementByInvokeText(elementID, index = undefined, scroll = undefined) {
    return this.getElement(elementID, index, scroll).invoke("text");
  }

  static getElementLength(elementID, index = undefined, scroll=false) {
    return this.getElement(elementID, index, scroll).its('length');
  }

  static getElementArrayLength(elementID) {
    return cy.get(elementID, { timeout: Cypress.env('global_timeout') }).its('length');
  }

  static getElementLengthByFinder(elementID, finder, index = undefined, scroll=false) {
    return this.getElement(elementID, index, scroll).find(finder).its('length');
  }

  static getElementAttribute(elementID, attr = 'href', index = undefined, scroll=undefined) {
    return this.getElement(elementID, index, scroll).invoke('attr', attr);
  }

  static getElementBySiblingsAndFinder(elementID, index = undefined, finder, indexFinder = undefined, scroll=undefined) {
    return this.getElement(elementID, index, scroll).find(finder).siblings().eq(indexFinder);
  }

  static getElementByFinderAndSiblingsAndParent(elementID, index = undefined, finder = "div", indexFinder = undefined, lastFinder = "div", lastIndex = 0, scroll=undefined) {
    return this.getElement(elementID, index, scroll).find(finder).siblings().parent().eq(indexFinder).find(lastFinder).eq(lastIndex);
  }

  static getIframe(elementID, index = undefined, scroll = undefined) {
    return this.getElement(elementID, index, scroll)
      .its('0.contentDocument.body')
      .should('be.visible')
      .then(cy.wrap);
  }

  static getIframeLoaded(elementID) {
    cy.frameLoaded(elementID);
  }

  static getElementByShadow(element, position = 0) {
    return this.getElement(element, position)
      .shadow();
  }

  static getElementByShadowAndFind(element, position = 0, find = null, p2 = 0) {
    return this.getElement(element, position)
      .shadow()
      .find(find)
      .eq(p2);
  }
}
