import Element from './element.js';

export default class Validation {
  static validateElementIsVisible(elementID, index = undefined, scroll = undefined) {
    Element.getElement(elementID, index, scroll).as('el');
    cy.get('@el').should('be.visible', {message: `O elemento não está visível. Identificador: ${elementID}.`});
  }

  static validateElementFilterByVisibleIsVisible(elementID, index = undefined, scroll = undefined) {
    Element.getElementFilterVisible(elementID, index, scroll).as('el');
    cy.get('@el').should('be.visible', {message: `O elemento não está visível. Identificador: ${elementID}.`});
  }

  static validateLastElementIsVisible(elementID, scroll = undefined) {
    Element.getLastElement(elementID, scroll).as('el');
    cy.get('@el').should('be.visible', {message: `O elemento não está visível. Identificador: ${elementID}.`});
  }

  static validateElementExist(elementID, index = undefined, scroll = false) {
    Element.getElement(elementID, index, scroll).as('el');
    cy.get('@el').should('exist', {message: `O elemento não existe. Identificador: ${elementID}.`});
  }

  static validateElementNotExist(elementID, scroll = false) {
    Element.getElementWithoutIndex(elementID, scroll)
      .should('not.exist', {message: `O elemento não deveria existir. Identificador: ${elementID}.`});
  }

  static validateElementIsNotVisible(elementID, index = undefined, scroll = false) {
    Element.getElement(elementID, index, scroll).as('el');
    cy.get('@el').should('be.not.visible', {message: `O elemento não deveria está visível. Identificador: ${elementID}.`});
  }

  static validateElementIsNotEmpty(elementID, index = undefined, scroll = undefined) {
    Element.getElement(elementID, index, scroll).as('el');
    cy.get('@el').should('to.be.not.empty', {message: `O elemento não deveria estar vazio. Identificador: ${elementID}.`});
  }

  static validateElementFilterVisibleIsNotEmpty(elementID, index = undefined, scroll = undefined) {
    Element.getElementFilterVisible(elementID, index, scroll).as('el');
    cy.get('@el').should('to.be.not.empty', {message: `O elemento não deveria estar vazio. Identificador: ${elementID}.`});
  }

  static validateElementIsEmpty(elementID, index = undefined, scroll = undefined) {
    Element.getElement(elementID, index, scroll).as('el');
    cy.get('@el').should('to.be.empty', {message: `O elemento deveria estar vazio. Identificador: ${elementID}.`});
  }

  static validateElementHaveText(elementID, text, index = undefined, scroll = undefined) {
    Element.getElement(elementID, index, scroll).as('el');
    cy.get('@el')
      .then((el) => {
        const actualText = el.text();
        cy.wrap(el)
          .should('have.text', text, `O texto do elemento está diferente do esperado. Atual: "${actualText}" - Esperado: "${text}". Identificador: ${elementID}.`);
      });
  }

  static validateElementContainsText(elementID, text, index = undefined, scroll = undefined) {
    Element.getElement(elementID, index, scroll)
      .invoke('text')
      .then((actualText) => {
        cy.wrap(actualText)
          .should("contains", text, { message: `O elemento não contém o texto esperado. Atual: ${actualText} - Esperado: "${text}". Identificador: ${elementID}`});
      });
  }

  static validateTextIsVisible(text) {
    Element.getElementByContainsText(text).as('el');
    cy.get('@el').should('be.visible', {message: `O elemento com o texto "${text}" está visível.`});
  }

  static validateElementContainInnerText(elementID, text, index = 0, scroll = undefined) {
    Element.getElement(elementID, index, scroll)
      .invoke('text')
      .then((actualText) => {
        cy.wrap(actualText.toLowerCase())
          .should('include', text.toLowerCase(), `O texto do elemento está diferente do esperado. Atual: "${actualText}" - Esperado: "${text.toLowerCase()}". Identificador: ${elementID}.`);
      });    
  }

  static validateCheckBoxIsChecked(elementID, index = undefined, scroll = undefined) {
    Element.getElement(elementID, index, scroll)
      .should('be.checked', {message: `Campo checkbox não está marcado. Identificador: ${elementID}.`});
  }

  static validateCheckBoxIsNotChecked(elementID, index = undefined, scroll = undefined) {
    Element.getElement(elementID, index, scroll)
      .should('be.not.checked', {message: `Campo checkbox não deveria estar marcado. Identificador: ${elementID}.`});
  }

  static validateElementLength(elementID, value, option = "", index = 0, scroll = undefined) {
    switch (option) {
    case ">=":
      Element.getElement(elementID, index, scroll)
        .should('have.length.gte', value, {message: `A quantidade deve ser maior ou igual a ${value}. Identificador: ${elementID}.`});
      break;
          
    case "<=":
      Element.getElement(elementID, index, scroll)
        .should('have.length.lte', value, {message: `A quantidade deve ser menor ou igual a ${value}. Identificador: ${elementID}.`});
      break;
          
    default:
      Element.getElement(elementID, index, scroll)
        .should('have.length', value, {message: `A quantidade deve ser igual a ${value}. Identificador: ${elementID}.`});
      break;
    }
  }

  static validateArrayElementLength(elementID, value, scroll = undefined) {
    if (elementID.includes("//")) {
      cy.xpath(elementID, { timeout: Cypress.env('global_timeout') })
        .should('have.length', value, {message: `A quantidade deve ser igual a ${value}. Identificador: ${elementID}.`});
    } else {
      cy.get(elementID, { timeout: Cypress.env('global_timeout') })
        .should('have.length', value, {message: `A quantidade deve ser igual a ${value}. Identificador: ${elementID}.`});
    }
  }

  static validateElementVal(elementID, value, index = undefined, scroll = false) {
    Element.getElement(elementID, index, scroll)
      .invoke('val')
      .then((actualValue) => {
        cy.wrap(actualValue)
          .should('equal', value, { message: `O elemento não contém o valor esperado. Atual: ${actualValue} - Esperado: "${value}". Identificador: ${elementID}.` });
      });    
  }

  static validateElementHaveLink(elementID, index = undefined, scroll = undefined) {
    Element.getElement(elementID, index, scroll)
      .should('have.attr', 'href', {message: `O elemento não possui o atributo "href". Identificador: ${elementID}`});
  }

  static validateLinkAttrHREF(elementID, path, index = undefined, scroll = undefined) {
    Element.getElement(elementID, index, scroll)
      .should('have.attr', 'href', { message: `Defeito encontrado no "href" do elemento. Esperado: "${path}". Identificador: ${elementID}.`}).and('include', path);
  }

  static validatePageContainsText(text) {
    cy.contains(text, { timeout: Cypress.env('global_timeout'), matchCase: false })
      .scrollIntoView({ offset: { top: -window.innerHeight / 2, left: 0 } }).as('el');
    cy.get('@el').should('be.visible', {message: `O texto "${text}" não está visível na página.`});
  }

  static validatePageNotContainsText(text) {
    cy.contains(text, { timeout: Cypress.env('global_timeout'), matchCase: false})
      .should('not.be.visible', {message: `O texto "${text}" não deveria estar visível na página.`});
  }

  static validateTextExistOnPage(text) {
    cy.contains(text, { timeout: Cypress.env('global_timeout'), matchCase: false}).as('el');
    cy.get('@el').should('exist', { message: `O elemento com texto "${text}" não foi encontrado.`});
  }

  static validateTextNotExistOnPage(text) {
    cy.contains(text, { timeout: Cypress.env('global_timeout'), matchCase: false})
      .should('not.exist', { message: `O texto "${text}" não deveria existir.`});
  }

  static validateURLStatus(method = 'GET', ambiente, status = 200) {
    cy.request({
      method: method,
      url: ambiente,
      failOnStatusCode: false
    })
      .then((res) => {
        cy.wrap(res)
          .should('have.deep.property', 'status', status, {
            message: `Status Code incorreto. Atual: ${res.status} - Esperado: ${status}.`
          });
      });
  }

  static validateRequestLoop(url, options = {}) {
    const {
      count = 0,
      maxRedirects = 3,
      visitedUrls = new Set(),
      timeout = 60000
    } = options;
  
    // Verifica se a URL já foi visitada (detecta loops reais)
    if (visitedUrls.has(url)) {
      throw new Error(`Loop de redirecionamento detectado! URLs visitadas: ${Array.from(visitedUrls).join(' -> ')}`);
    }
  
    // Adiciona URL atual ao conjunto de URLs visitadas
    visitedUrls.add(url);
  
    return cy.request({
      url: url + Cypress.env("utm_source"),
      followRedirect: false, // Desabilita seguir redirecionamentos automaticamente
      method: 'GET',
      failOnStatusCode: false,
      retryOnNetworkFailure: true,
      timeout
    }).then((response) => {
      const isRedirect = response.status === 301 || response.status === 302;
      
      if (isRedirect) {
        if (count >= maxRedirects) {
          throw new Error(`Número máximo de redirecionamentos (${maxRedirects}) excedido! URLs visitadas: ${Array.from(visitedUrls).join(' -> ')}`);
        }
  
        const redirectUrl = response.headers.location;
        cy.log(`Redirecionamento ${count + 1}: ${url} -> ${redirectUrl}`);
  
        // Chama recursivamente com as mesmas opções, incrementando o contador
        return Validation.validateRequestLoop(redirectUrl, {
          count: count + 1,
          maxRedirects,
          visitedUrls,
          timeout
        });
      }
  
      cy.log(`Redirecionamentos concluídos com sucesso. URL final: ${url}`);
    });
  }

  static validateRequestStatusCode(response_request, expectCode, prop1 = undefined, prop2 = undefined, prop3 = undefined) {
    if(prop1)
      expect(response_request.body).to.have.property(prop1).and.to.be.not.empty;
    if(prop2)
      expect(response_request.body).to.have.property(prop2).and.to.be.not.empty;
    if(prop3)
      expect(response_request.body).to.have.property(prop3).and.to.be.not.empty;

    expect(response_request.status).to.be.eq(expectCode);
  }

  static validateRequestPropertyBoolean(value, expected) {
    expect(value, `O valor da propriedade diferente do esperado. Atual: ${value} - Esperado: ${expected}.`).to.equal(expected);
  }

  static validateElementIsVisibleByShadow(element, position = 0, find = null, p2 = 0) {
    return Element.getElement(element, position)
      .shadow()
      .find(find)
      .eq(p2)
      .should('be.visible');
  }

  static validateUrlPartialEndpoint(endpoint, vtimeout = Cypress.env('global_timeout')) {
    cy.url({ timeout: vtimeout})
      .should('include', endpoint, {message: `A URL da página não contém o endpoint esperado: "${endpoint}".`})
      .then(() => {
        cy.wait(2000);
      });
  }

  static validateElementIsVibileInsideIframe(elementID, elementInside) {
    Element.getIframeLoaded(elementID);
    cy.iframe(elementID)
      .find(elementInside)
      .should('be.visible', {message: `O elemento dentro do iframe não está visível. Identificador: iframe ${elementID} - ${elementInside}.`});
  }

  static validateElementIsVibileInsideIframeByXpath(elementID, elementInside) {
    Element.getIframeLoaded(elementID);
    cy.iframe(elementID)
      .xpath(elementInside)
      .should('be.visible', {message: `O elemento não está visível. Identificador: iframe ${elementID} - ${elementInside}.`});
  }

  static validatePlaceholder(elementID, placeholder, index = undefined, scroll = undefined) {
    Element.getElement(elementID, index, scroll)
      .should("have.attr", "placeholder", placeholder, { message: `O atributo 'placeholder' do elemento não é igual a '${placeholder}'. Identificador: ${elementID}.`});
  }

  static validateImgIsVisible(elementID) {
    Element.getElement(elementID)
      .should('be.visible')
      .and(($img) => {
        expect($img[0].naturalWidth, 'A imagem deve ter uma largura natural maior que 0.').to.be.greaterThan(0);
        expect($img[0].naturalHeight, 'A imagem deve ter uma altura natural maior que 0.').to.be.greaterThan(0);
      });
  }
}
