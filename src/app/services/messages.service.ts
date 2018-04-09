import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";

export enum Severity {
    INFO,
    SUCCESS,
    WARNING,
    ERROR
}

export class Message {

    public severityName: string;
    public timestamp: Date;

    constructor(public severity: Severity, public title: string, public content: string) {
        this.severityName = Severity[this.severity].toLowerCase();
        this.timestamp = new Date();
    }

    toString(): string {
        return "[" + Severity[this.severity] + "] " + this.title + (this.content ? " - " + this.content : "");
    }
}

export class MessageServiceEvent {
    constructor(public message?: Message) {
    }
}

@Injectable()
export class MessagesService {

    private messages: Message[] = [];

    private eventSource: Subject<MessageServiceEvent> = new Subject<MessageServiceEvent>();
    public events: Observable<MessageServiceEvent> = this.eventSource.asObservable();

    constructor() {

    }

    public createChannel(name: string): Channel {
        return new Channel(name, this);
    }

    public publish(message: Message): void {
        this.messages.unshift(message);
        this.emitEvent(new MessageServiceEvent(message));
    }

    public remove(message: Message): void {
        var index = this.messages.indexOf(message);
        if (index >= 0) {
            this.messages.splice(index, 1);
            this.emitEvent(new MessageServiceEvent());
        }
    }

    public clear(): void {
        this.messages = new Array();
        this.emitEvent(new MessageServiceEvent());
    }

    public getMessages(): Message[] {
        return this.messages;
    }

    private emitEvent(event: MessageServiceEvent) {
        if (this.eventSource && event) {
            this.eventSource.next(event);
        }
    }
}

export class Channel {

    constructor(private name: string, private messageService: MessagesService) {
    }

    public info(message: string): void {
        this.messageService.publish(new Message(Severity.INFO, this.name, message));
    }

    public success(message: string): void {
        this.messageService.publish(new Message(Severity.SUCCESS, this.name, message));
    }

    public warning(message: string): void {
        this.messageService.publish(new Message(Severity.WARNING, this.name, message));
    }

    public error(message: string): void {
        this.messageService.publish(new Message(Severity.ERROR, this.name, message));
    }
}