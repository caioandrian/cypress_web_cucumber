export default class Request {
  static requestApiWithBody(ambiente, body = [], method = 'POST') {
    return cy.request({
      method: method,
      url: ambiente,
      failOnStatusCode: false,
      body: body
    });
  }

  static http_request_with_body(method, endpoint, body, headers = {}, qs = {}, failOnStatusCode = false, timeout = Cypress.env('global_timeout')) {
    return cy.request({
      method: method,
      url: endpoint,
      body: body,
      headers: headers,
      failOnStatusCode: failOnStatusCode,
      timeout: timeout,
      qs: qs
    });
  }

  static http_request_without_body(method, endpoint, headers = {}, qs = {}, failOnStatusCode = false, timeout = Cypress.env('global_timeout')) {
    return cy.request({
      method: method,
      url: endpoint,
      headers: headers,
      failOnStatusCode: failOnStatusCode,
      timeout: timeout,
      qs: qs
    });
  }
}
