import {Pipe, PipeTransform} from "@angular/core";
import {TranslateService} from "../services/translate.service";

@Pipe({name: 'translate', pure: false})
export class TranslatePipe implements PipeTransform {

    constructor(private translateService: TranslateService) {

    }

    transform(key: any): string {
        if (key) {
            return this.translateService.translate(key);
        }
        return '?' + key + '?';
    }
}