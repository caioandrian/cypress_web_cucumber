const aux_timeout = 0;

import Element from './element.js';

export default class Utils {
  static extractContent(s) {
    var span = document.createElement('span');
    span.innerHTML = s;
    return span.textContent || span.innerText;
  }

  static elementForceShow(elementID, index = undefined, scroll = undefined) {
    return Element.getElement(elementID, index, scroll).invoke("show");
  }

  static elementForceRemove(elementID, index = undefined, scroll = undefined) {
    return Element.getElement(elementID, index, scroll).invoke("remove");
  }

  static elementChangeAttribute(elementLink, attr, value) {
    Element.getElement(elementLink)
      .invoke('attr', attr, value)
      .should('have.attr', attr, value);
  }

  static conditionalJavascriptElementFound(element) {
    return cy.document()
      .then((doc) => {
        const e = doc.querySelector(element);

        if(e) {
          cy.log("O elemento existe");
          return cy.wrap(true);
        } else {
          cy.log("O elemento não existe");
          return cy.wrap(false);
        }
      });
  }

  static conditionalJavascriptElementXpathFound(xpath) {
    return cy.document()
      .then((doc) => {
        const e = doc.evaluate(xpath, doc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

        if(e) {
          cy.log("O elemento existe");
          return cy.wrap(true);
        } else {
          cy.log("O elemento não existe");
          return cy.wrap(false);
        }
      });
  }

  static countPropertyOccurrencesInsideArray(arr, property) {
    let count = 0;
    
    function countInObject(obj) {
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          if (key === property) {
            count++;
          }
          if (typeof obj[key] === 'object' && obj[key] !== null) {
            countInObject(obj[key]);
          }
        }
      }
    }
    
    for (const item of arr) {
      countInObject(item);
    }
    
    return count;
  }
}
