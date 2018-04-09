import {Pipe, PipeTransform} from "@angular/core";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@Pipe({name: 'saveURL', pure: true})
export class SaveURLPipe implements PipeTransform {

    constructor(private sanitizer: DomSanitizer) {
    }

    transform(url: string): SafeResourceUrl {
        if (!url) {
            return null;
        }
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
}