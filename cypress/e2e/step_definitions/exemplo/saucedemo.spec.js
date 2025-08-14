import {Given, When, Then, After, Before} from 'cypress-cucumber-preprocessor/steps';

import {Saucedemo_login} from '../../../pages/exemplo/saucedemo/login';
import {Saucedemo_Home} from '../../../pages/exemplo/saucedemo/home';
import {Saucedemo_Carrinho} from '../../../pages/exemplo/saucedemo/carrinho/';
import {Saucedemo_Checkout} from '../../../pages/exemplo/saucedemo/checkout';
import {Saucedemo_Resumo} from '../../../pages/exemplo/saucedemo/resumo';

var array_carrinho = []

beforeEach(()=>{
  array_carrinho = []
})

Given(`que esteja logado com uma conta ativa no site saucedemo`, () => {
  Saucedemo_login.acessar_site();
});

Given(`que tenha feito o login no site saucedemo`, () => {
  Saucedemo_login.fazer_login();
});

When(`adicionar o produto na posicao {int} no carrinho de compras`, (posicao) => {
  Saucedemo_Home.adicionar_produto_carrinho(posicao, array_carrinho).as('array_produtos_carrinho')
});

When(`remover o produto na posicao {int} do carrinho de compras`, (posicao) => {
  Saucedemo_Home.remover_produto_carrinho(posicao, array_carrinho).as('array_produtos_carrinho')
});

When(`preencher meus dados pessoais na tela de checkout`, () => {
  Saucedemo_Home.acessar_carrinho()
  Saucedemo_Carrinho.prosseguir_checkout()
  Saucedemo_Checkout.preencher_dados_pessoais()
});

Then(`a quantidade de produtos no ícone do carrinho deverá estar atualizada`, () => {
  cy.get('@array_produtos_carrinho').then((array) => {
    Saucedemo_Home.valida_qtde_produtos_menu_carrinho(array);
  })
});

Then(`o produto deverá aparecer no carrinho do usuário`, () => {
  cy.get('@array_produtos_carrinho').then((array) => {
    Saucedemo_Home.acessar_carrinho()
    Saucedemo_Carrinho.valida_produtos_carrinho(array);
  })
});

Then(`devo visualizar as informações do meu pedido na tela de resumo da compra`, () => {
  cy.get('@array_produtos_carrinho').then((array) => {
    Saucedemo_Checkout.ir_para_resumo()
    Saucedemo_Resumo.valida_resumo_compra(array)
  })
});

Then(`devo visualizar a mensagem de confirmação do pedido finalizado`, () => {
  Saucedemo_Resumo.finalizar_pedido()
});