import {Component, Input, OnChanges} from "@angular/core";
import {TranslateService} from "../services/translate.service";

@Component({
    selector: 'inputErrors',
    template: `
	<span *ngIf="errorMessage">
		{{errorMessage}}
	</span>
	`
})
export class InputErrorsComponent implements OnChanges {
    @Input() source: any;

    errorMessage: any;

    constructor(private translateService: TranslateService) {
    }

    ngOnChanges(changes: any): void {

        var errors: any = changes.source.currentValue;
        var key: string = this.getFirstErrorMessageKey(errors);
        if (key) {
            var translated = this.translateService.translate("error." + key);
            this.errorMessage = this.translateService.replacePlaceholders(translated, errors[key]);
        } else {
            this.errorMessage = null;
        }
        // console.log("CHANGES: " + JSON.stringify(changes.source.currentValue));
    }

    getFirstErrorMessageKey(errors: any): string {
        if (!errors) {
            return null;
        }
        for (let key of Object.keys(errors)) {
            return key;
        }
    }
}