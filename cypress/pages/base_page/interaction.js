import Element from './element.js';

export default class Interaction {
  static clickElement(elementID, index = undefined, scroll = undefined) {
    Element.getElement(elementID, index, scroll).as('el');
    return cy.get('@el').click({force: true});
  }

  static clickElementByText(text, index = undefined, caseSensitive = false) {
    Element.getElementByContainsText(text, index, caseSensitive).click({force: true});
  }

  static clickElementByFind(elementID, finder=undefined, index = undefined, scroll = undefined, indexFinder = undefined) {
    Element.getElementByFind(elementID, finder, index, scroll, indexFinder).as('el');
    cy.get('@el').click({force: true});
  }

  static clickElementFilterByVisible(elementID, index = undefined) {
    Element.getElementFilterVisible(elementID, index).as('el');
    cy.get('@el').click({force: true});
  }

  static clickElementCheckBox(elementID, option, index=undefined, scroll = true) {
    Element.getElement(elementID, index, scroll).check(option, { force: true })
      .should('be.checked', {message: `Campo checkbox não está marcado. Identificador: ` + elementID});
  }

  static clickElementByExistText(validate_text, element1, element2) {
    Element.getElement('body', false).then(($body)=>{
      if ($body.text().includes(validate_text))
        Interaction.clickElement(element1);
      else
        Interaction.clickElement(element2);
    });
  }

  static doubleClickElement(elementID, index = undefined, scroll = undefined) {
    return Element.getElement(elementID, index, scroll).dblclick({force: true});
  }

  static doubleClickElementByText(txt, index = undefined, scroll = undefined) {
    Element.getElementByContainsText(txt, index, scroll).dblclick({force: true});
  }

  static doubleClickElementByFind(elementID, finder=undefined, index = undefined, scroll = undefined) {
    Element.getElementByFind(elementID, finder, index, scroll).dblclick({force: true});
  }

  static hoverElement(elementID, index = undefined, scroll = undefined) {
    return Element.getElement(elementID, index, scroll).trigger("mouseover");
  }

  static typeElement(elementID, text, index = undefined, scroll = undefined, opt_delay=10) {
    Element.getElement(elementID, index, scroll).type(text, { force: true, delay: opt_delay});
  }

  static typeLastElement(elementID, text, index = undefined, scroll = undefined, opt_delay=10) {
    Element.getLastElement(elementID, index, scroll).type(text, { force: true, delay: opt_delay});
  }

  static typeElementByFind(elementID, finder = undefined, index = undefined, scroll = undefined) {
    Element.getElementByFind(elementID, finder, index, scroll).type(text, { force: true });
  }

  static clearElementInput(elementID, index = undefined, scroll = undefined) {
    Element.getElement(elementID, index, scroll).clear();
  }

  static typeAndBlurElement(element, text, index = undefined, scroll = undefined) {
    Element.getElement(element, index, scroll).type(text).blur();
  }

  static clearElementAndType(element, text, index = undefined, scroll = undefined) {
    Interaction.clearElementInput(element, index, scroll);
    cy.wait(2000);
    Interaction.typeElement(element, text, index, scroll);
  }

  static selectOption(element, option, index = undefined, scrollIntoView = false) {
    return Element.getElement(element, index, scrollIntoView).select(option);
  }

  static selectRandomOption(element, index = undefined, scrollIntoView = false) {
    Element.getElement(element, index, scrollIntoView)
      .find("option")
      .its("length")
      .then((optionsLength) => {
        const random_option = Math.floor(Math.random() * optionsLength);
                
        //se a primeira opcao for selecione...
        if(random_option == 0)
          random_option += 1;

        Element.getElement(element).select(random_option);
      });
  }

  static checkRadioOption(element, value, scrollIntoView = false) {
    return Element.getElement(element, scrollIntoView).check(value);
  }

  static typeElementInsideIframe(elementID, elementInside, value) {
    Element.getIframe(elementID)
      .find(elementInside)
      .eq(0)
      .type(value, { force: true});
  }

  static clickElementInsideIframe(elementID, elementInside, index = 0) {
    Element.getIframeLoaded(elementID);
    cy.iframe(elementID).find(elementInside).eq(index).click({force: true});
  }

  static clickElementInsideIframeByXpath(elementID, elementInside, index = 0) {
    Element.getIframeLoaded(elementID);
    cy.iframe(elementID).xpath(elementInside).eq(index).click({force: true});
  }

  static sendKey(text, opt_delay=10) {
    Element.getElement('body').type('{' + text + '}', { force: true, delay: opt_delay});
  }

  static sendKeyToElement(elementID, text, index = undefined, scroll = undefined, opt_delay=10) {
    Element.getElement(elementID, index, scroll).type('{' + text + '}', { force: true, delay: opt_delay});
  }

  static clickElementByShadowAndFind(element, position = 0, find = null, p2 = 0) {
    return Element.getElement(element, position)
      .shadow()
      .find(find)
      .eq(p2)
      .click({force: true});
  }
}
