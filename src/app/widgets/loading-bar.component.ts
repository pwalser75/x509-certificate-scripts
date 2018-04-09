import {Component, Input} from "@angular/core";
import {LoadingBarService} from "../services/loading-bar.service";

@Component({
    selector: 'loading',
    template: `
        <div class="loading">
            <div class="progress" [style.width]="(getProgress()*100)+'%'"
                 [style.background]="color" [style.height]="'3px'" [style.box-shadow]="'0 0 4px '+color"
                 [style.opacity]="isVisible()? '1':'0'" [style.transition]="'all 0.5s ease'">
            </div>
        </div>`
})
export class LoadingBarComponent {

    @Input() color: string = '#FF7D07';

    private progress: number;
    private visible: boolean;

    constructor(private loadingBarService: LoadingBarService) {
        loadingBarService.events.subscribe(event => {
                this.progress = event.progress;
                this.visible = event.visible;
            }
        );
    }

    getProgress(): number {
        return this.progress;
    }

    isVisible(): boolean {
        return this.visible;
    }
}