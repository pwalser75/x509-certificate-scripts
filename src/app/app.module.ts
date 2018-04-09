import {NgModule} from "@angular/core";
import {HttpModule} from "@angular/http";
import {ReactiveFormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {AppComponent} from "./app.component";
import {AppMenuComponent} from "./menu/app-menu.component";
import {LanguageMenuComponent} from "./menu/lang-menu.component";
import {TranslateService} from "./services/translate.service";
import {CommaSeparatedPipe} from "./pipes/comma-separated.pipe";
import {TranslatePipe} from "./pipes/translate.pipe";
import {InputErrorsComponent} from "./widgets/input.errors.component";
import {InputComponent} from "./widgets/input-component.component";
import {MessagesService} from "./services/messages.service";
import {LimitPipe} from "./pipes/limit.pipe";
import {SaveURLPipe} from "./pipes/save-url.pipe";
import {LoadingBarService} from "./services/loading-bar.service";
import {LoadingBarComponent} from "./widgets/loading-bar.component";
import {CertificatesComponent} from "./components/certificates/certificates.component";
import {ROUTING} from "./app.routes";

@NgModule({
    imports: [BrowserModule, HttpModule, ReactiveFormsModule, ROUTING],
    declarations: [
        AppComponent,
        AppMenuComponent,
        LanguageMenuComponent,
        InputComponent,
        InputErrorsComponent,
        LoadingBarComponent,
        CertificatesComponent,
        CommaSeparatedPipe,
        LimitPipe,
        TranslatePipe,
        SaveURLPipe
    ],
    providers: [
        MessagesService,
        TranslateService,
        LoadingBarService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

