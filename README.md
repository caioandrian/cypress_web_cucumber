# 🚀 Automação QA com Cypress

![Cypress](https://img.shields.io/badge/Cypress-E2E%20Testing-green?style=flat&logo=cypress) 
![Cucumber](https://img.shields.io/badge/Cucumber-BDD-blue?style=flat&logo=cucumber)
![Node.js](https://img.shields.io/badge/Node.js-v18.x%20LTS-green?style=flat&logo=node.js)
![QA Automation](https://img.shields.io/badge/QA%20Automation-Continuous%20Testing-orange?style=flat&logo=testing-library)
![License](https://img.shields.io/badge/License-MIT-brightgreen?style=flat)

Este repositório contém diferentes implementações de automação de testes E2E usando Cypress, com exemplos variando entre Cypress Nativo, integração com Cucumber (BDD) e relatórios customizados para o New Relic.

---

Sites usados nos exemplos:

E-commerce (https://www.saucedemo.com)<br>

---

## 📂 Branches Disponíveis

| Branch                               | Descrição                                                                                                  |                                                                                                       |
|--------------------------------------|------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------|
| **Main**                   |           Exemplo básico do cypress com integração BDD usando Cucumber.                                                  | [link](https://github.com/caioandrian/cypress_web_cucumber/tree/main)                                     |

---

## 📂 Estrutura do Projeto

O projeto está organizado da seguinte forma:

- **cypress/e2e**: Contém os testes E2E escritos em Gherkin.
- **cypress/pages**: Implementa o padrão Page Object Model para organizar o código de automação.
- **cypress/plugins**: Configura plugins e pre-processadores, como o Cucumber.
- **cypress/support**: Contém comandos customizados e configurações globais.
- **cypress/config-files**: Arquivos de configuração para diferentes ambientes (hmg, prod).

## 📦 Dependências e Scripts

O projeto utiliza as seguintes dependências principais:

- `cypress`
- `cypress-cucumber-preprocessor`
- `cypress-mochawesome-reporter`
- `cypress-xpath`
- `cypress-file-upload`

Scripts disponíveis:

- `cy:open`: Abre o Cypress.
- `cy:run-all`: Executa todos os testes no modo headless.
- `cy:run-exemplo-saucedemo`: Executa testes específicos para o exemplo saucedemo.

## ⚙️ Configurações e Plugins

O arquivo `cypress/plugins/index.js` configura o preprocessor do Cucumber e outros plugins como `cypress-mochawesome-reporter`. As configurações de ambiente são geridas através de arquivos JSON na pasta `config-files`.

## 🛠️ Comandos Customizados

Comandos customizados são definidos no arquivo `support/commands.js`, utilizando bibliotecas como `cypress-xpath` e `cypress-file-upload`.

--- FIM ---
