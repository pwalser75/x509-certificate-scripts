import {Pipe, PipeTransform} from "@angular/core";

@Pipe({name: 'limit', pure: true})
export class LimitPipe implements PipeTransform {

    constructor() {

    }

    transform(text: string, limit: number): string {
        if (!text || limit <= 0 || text.length <= limit) {
            return text;
        }
        var result = '';
        var tokens = text.split(' ');
        while (tokens && result.length < limit) {
            if (result) {
                result += ' ';
            }
            result += tokens.shift();
        }

        return result + (tokens ? '…' : '');
    }
}