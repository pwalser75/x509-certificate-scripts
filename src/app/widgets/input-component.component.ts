import {Component, Input, OnChanges} from "@angular/core";
import {TranslateService, TranslateServiceEvent, TranslateServiceEventType} from "../services/translate.service";

@Component({
    selector: 'input-component',
    templateUrl: 'input-component.html'
})
export class InputComponent implements OnChanges {
    @Input() name: any;
    @Input() label: any;
    @Input() errors: any;

    @Input() control: any;
    //@ViewChild(FormControl) control:FormControl;

    errorKey: any;
    errorValue: any;
    errorMessage: any;

    constructor(private translateService: TranslateService) {
        this.translateService.events.subscribe((event: TranslateServiceEvent) => {
            if (event.type === TranslateServiceEventType.LANGUAGE_LOADED) {
                console.log("Language loaded: " + event.data);
            }
            if (event.type === TranslateServiceEventType.LANGUAGE_CHANGED) {
                console.log("Language changed: " + event.data);
            }
            this.updateErrorMessage();
        });
    }

    ngOnChanges(changes: any): void {

        var errors: any = changes.errors.currentValue;
        var key: string = this.getFirstErrorMessageKey(errors);
        this.errorKey = key;
        this.errorValue = key ? errors[key] : null;
        this.updateErrorMessage();
    }

    private updateErrorMessage(): void {
        if (this.errorKey) {
            var translated = this.translateService.translate("error." + this.errorKey);
            this.errorMessage = this.translateService.replacePlaceholders(translated, this.errorValue);
        } else {
            this.errorMessage = null;
        }
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