import {Pipe, PipeTransform} from "@angular/core";

@Pipe({name: 'commaSeparated'})
export class CommaSeparatedPipe implements PipeTransform {

    transform(value: any[]): string {
        if (value) {
            return value.join(", ");
        }
        return '';
    }
}