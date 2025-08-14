import Element from './element.js';
import Navigation from './navigation.js';

export default class Wait {
  static explicitWait(seconds = 2000) {
    cy.wait(seconds);
  }

  static implicitWait(method = "GET", endpoint = "", alias='loadPageFirst') {
    cy.intercept({
      method: method,
      url: endpoint,
    }).as(alias);
  }

  static getWait(alias='@loadPageFirst', status_esperado = 200, status_alternativo=304, xtimeout = 50000) {
    if(!alias.includes('@')) alias = '@' + alias;
    const expectedStatuses = [status_esperado, 201, 202, 203, status_alternativo];

    return cy.wait(alias, { timeout: xtimeout })
      .its('response.statusCode')
      .then((status) => {
        cy.wrap(status)
          .should('be.oneOf', expectedStatuses, { message: `Status Code incorreto. Request: "${alias}". Atual: ${status} - Esperado: ${expectedStatuses}.`} );
      });
  }

  static waitUntilErrorNextStop(qtde_tentativas = 2, pass = false) {
    cy.log('...Remaining attempts: ' + qtde_tentativas);

    Element.getElement('body')
      .then(($body)=>{
        if ($body.text().includes('client-side exception')) {
          Element.getElementText("h2")
            .then((txt) => {
              console.log(txt);
              if (qtde_tentativas == 0 && pass == false)
                throw 'Erro do next';

              if (txt.trim().includes('client-side exception') && pass == false) {
                console.log("entrou");
                Navigation.reloadPage();
                cy.wait(5000);
                Wait.waitUntilErrorNextStop(qtde_tentativas - 1, false);
              } else {
                pass = true;
                return "ok";
              }
            });
        } else {
          pass = true;
          return "ok";
        }
      });
  }
}
