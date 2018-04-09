import {Component} from "@angular/core";
import {TranslateService} from "../services/translate.service";

@Component({
    selector: 'lang-menu',
    templateUrl: 'lang-menu.html'
})
export class LanguageMenuComponent {

    constructor(public translateService: TranslateService) {
    }

}

