import Element from '../base_page/element';
import Interaction from '../base_page/interaction';
import Request from '../base_page/request';
import Wait from '../base_page/wait';
import Accessibility from '../base_page/accessibility';
import Navigation from '../base_page/navigation';
import Validation from '../base_page/validation';
import Utils from '../base_page/utils';

export class Acessibilidade{

    static validar_acessibilidade(){
        Accessibility.validateAccessibility();
    }
}