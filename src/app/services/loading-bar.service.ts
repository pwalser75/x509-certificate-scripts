import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";
import {NavigationEnd, NavigationStart, Router} from "@angular/router";

export class LoadingBarEvent {
    constructor(public progress: number, public visible: boolean) {
    }
}

@Injectable()
export class LoadingBarService {

    private startTime: number = null;
    private stopTime: number = null;
    private usageCounter: number = 0;

    private updateTimer: any;
    private fadeoutTimer: any;

    private fadeoutTimeMs: number = 500;
    private intervalMs: number = 50;

    private progress: number = 0;
    private visible: boolean = false;

    private eventSource: Subject<LoadingBarEvent> = new Subject<LoadingBarEvent>();
    public events: Observable<LoadingBarEvent> = this.eventSource.asObservable();

    constructor(router: Router) {
        router.events.subscribe(e => {
            if (e instanceof NavigationStart) {
                this.start();
            }

            if (e instanceof NavigationEnd) {
                this.stop();
            }
        });
    }

    // Starts the loading bar. Increases the internal usage counter, to allow concurrent access to the loading bar.
    public start(): void {
        if (this.usageCounter === 0) {
            this.startTime = new Date().getTime();
            this.stopTime = null;
            this.startTimer();
        }
        this.visible = true;
        this.usageCounter++;
        this.fireUpdateEvent();
    }

    // Decreases the usage counter, and stops the loading progress once the usage reaches zero.
    public stop(): void {
        if (this.usageCounter === 0) {
            return;
        }
        this.usageCounter--;
        if (this.usageCounter === 0) {
            clearTimeout(this.updateTimer);
            this.updateTimer = null;
            this.stopTime = new Date().getTime();
            this.progress = 1;
            this.fireUpdateEvent();
            this.fadeoutTimer = setTimeout(() => {
                this.visible = false;
                this.fireUpdateEvent();
                setTimeout(() => {
                    this.progress = 0;
                    this.fireUpdateEvent();
                }, this.fadeoutTimeMs);
            }, this.fadeoutTimeMs);
        }
    }

    private startTimer() {
        if (this.updateTimer) {
            return;
        }
        if (this.fadeoutTimer) {
            clearTimeout(this.fadeoutTimer);
            this.fadeoutTimer = null;
        }
        this.updateTimer = setInterval(() => {
            this.progress = this.calculateProgress();
            this.fireUpdateEvent();
        }, this.intervalMs);
    }

    // returns the duration (in milliseconds) since starting the progress bar. returns 0 when not started or already stopped.
    private getDuration(): number {
        if (this.stopTime) {
            return this.stopTime - this.startTime;
        }
        if (this.startTime) {
            return new Date().getTime() - this.startTime;
        }
        return 0;
    }

    // returns the current progress (value between 0 (=0%) and 1 (=100%))
    private calculateProgress(): number {
        var factor = 2000.0;
        // sigmoid function, translated and scaled to return values between 0 and 1
        var progress: number = 2 / (1 + Math.exp(-this.getDuration() / factor)) - 1;
        return progress;
    }

    private fireUpdateEvent() {
        this.eventSource.next(new LoadingBarEvent(this.progress, this.visible));

    }
}