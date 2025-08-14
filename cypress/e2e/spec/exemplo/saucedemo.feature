#language: pt

Funcionalidade: SauceDemo - Ecommerce

    Como usuário
    Quero acessar o site

    Contexto:
        Dado que esteja logado com uma conta ativa no site saucedemo
        E que tenha feito o login no site saucedemo

    Cenário: Adicionar produto no carrinho pela home
        Quando adicionar o produto na posicao 2 no carrinho de compras
        E adicionar o produto na posicao 3 no carrinho de compras
        Então a quantidade de produtos no ícone do carrinho deverá estar atualizada
        E o produto deverá aparecer no carrinho do usuário
    
    Cenário: Remover produto do carrinho pela home
        Quando adicionar o produto na posicao 3 no carrinho de compras
        E remover o produto na posicao 3 do carrinho de compras
        Então a quantidade de produtos no ícone do carrinho deverá estar atualizada

    Cenário: Finalizar pedido com sucesso
        Quando adicionar o produto na posicao 2 no carrinho de compras
        E adicionar o produto na posicao 3 no carrinho de compras
        E preencher meus dados pessoais na tela de checkout
        Então devo visualizar as informações do meu pedido na tela de resumo da compra
        E devo visualizar a mensagem de confirmação do pedido finalizado