import Element from '../../../base_page/element';
import Interaction from '../../../base_page/interaction';
import Request from '../../../base_page/request';
import Wait from '../../../base_page/wait';
import Accessibility from '../../../base_page/accessibility';
import Navigation from '../../../base_page/navigation';
import Validation from '../../../base_page/validation';
import Utils from '../../../base_page/utils';

const el = require('./elements').ELEMENTS;

export class Saucedemo_login{
  static acessar_site(){
    Navigation.visit(Cypress.env("saucedemo"));
  }

  static fazer_login(){
    Interaction.typeElement(el.FORM_LOGIN.INPUT_USERNAME, Cypress.env('users').saucedemo.username)
    Interaction.typeElement(el.FORM_LOGIN.INPUT_PASSWORD, Cypress.env('users').saucedemo.senha)
    Interaction.clickElement(el.FORM_LOGIN.BTN_LOGAR)
  }
}