import {Given, When, Then, After, Before} from 'cypress-cucumber-preprocessor/steps';

var array_carrinho = []

beforeEach(()=>{
  array_carrinho = []
})

Given(`que esteja logado com uma conta ativa no site saucedemo`, () => {
  cy.visit(Cypress.env("saucedemo"));
});

Given(`que tenha feito o login no site saucedemo`, () => {
  cy.get('[data-test=\'username\']').type(Cypress.env('users').saucedemo.username);
  cy.get('[data-test=\'password\']').type(Cypress.env('users').saucedemo.senha);
  cy.get('[data-test=\'login-button\']').click();
});

When(`adicionar o produto na posicao {int} no carrinho de compras`, (posicao) => {
  cy.get('.inventory_list .inventory_item').eq(posicao).find('.pricebar button').click();
  cy.get('.inventory_list .inventory_item').eq(posicao).find('.pricebar button').should('have.text', 'Remove');

  let dados_produto = {};

  cy.get('.inventory_list .inventory_item').eq(posicao).find('.inventory_item_name').invoke('text').then((titulo) => {
    dados_produto.titulo = titulo;
  });

  cy.get('.inventory_list .inventory_item').eq(posicao).find('.inventory_item_description .pricebar .inventory_item_price').invoke('text').then((preco) => {
    dados_produto.preco = preco;
  });

  array_carrinho.push(dados_produto);

  cy.wrap(array_carrinho).as('array_produtos_carrinho');
});

When(`remover o produto na posicao {int} do carrinho de compras`, (posicao) => {
  cy.get('.inventory_list .inventory_item').eq(posicao).find('.pricebar button').click();
  array_carrinho.pop();
  cy.get('.inventory_list .inventory_item').eq(posicao).find('.pricebar button').should('have.text', 'Add to cart');

  cy.wrap(array_carrinho).as('array_produtos_carrinho');
});

When(`preencher meus dados pessoais na tela de checkout`, () => {
  cy.get('[data-test=\'shopping-cart-link\']').click();
  cy.get('[data-test=\'checkout\']').should('be.visible').click();
  cy.get('[data-test=\'firstName\']').type('Caio QA', { delay: 100 });
  cy.get('[data-test=\'lastName\']').type('Senha_12345.*', { delay: 150 });
  cy.get('[data-test=\'postalCode\']').type('88220005', { delay: 100 });
});

Then(`a quantidade de produtos no ícone do carrinho deverá estar atualizada`, () => {
  cy.get('@array_produtos_carrinho').then((array) => {
    if (array.length >= 1) {
    cy.get('.shopping_cart_badge').should('have.text', array.length.toString());
  } else {
    cy.get('.shopping_cart_badge').should('not.exist');
  }
  })
});

Then(`o produto deverá aparecer no carrinho do usuário`, () => {
  cy.get('[data-test=\'shopping-cart-link\']').click();
  array_carrinho.forEach((obj, index) => {
    cy.get('.cart_item').eq(index).find('.inventory_item_name').should('have.text', obj.titulo);
    cy.get('.cart_item').eq(index).find('.inventory_item_price').should('have.text', obj.preco);
  });
});

Then(`devo visualizar as informações do meu pedido na tela de resumo da compra`, () => {
  cy.get('@array_produtos_carrinho').then((array) => {
    cy.get('[data-test=\'continue\']').should('be.visible').click();
  cy.get('.cart_item_label').should('have.length', array.length);
  array.forEach((obj, index) => {
    cy.get('.cart_item_label').eq(index).find('.inventory_item_name').should('have.text', obj.titulo);
    cy.get('.cart_item_label').eq(index).find('.inventory_item_price').should('have.text', obj.preco);
  });
  cy.get('.cart_item_label').should('not.be.empty');
  cy.get('.summary_subtotal_label').should('not.be.empty');
  cy.get('.summary_tax_label').should('not.be.empty');
  cy.get('.summary_total_label').should('not.be.empty');
  })
});

Then(`devo visualizar a mensagem de confirmação do pedido finalizado`, () => {
  cy.get('[data-test=\'finish\']').should('be.visible').click();
  cy.get('[data-test=\'complete-header\']').should('have.text', 'Thank you for your order!');
  cy.get('[data-test=\'back-to-products\']').should('be.visible');
});