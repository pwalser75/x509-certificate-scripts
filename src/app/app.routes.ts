import {RouterModule, Routes} from "@angular/router";
import {CertificatesComponent} from "./components/certificates/certificates.component";

const APP_NAME = "X.509 Certificates";

const ROUTES: Routes = [
    {
        path: '',
        redirectTo: '/certificates',
        pathMatch: 'full',
        data: {title: APP_NAME}
    },
    {
        path: 'certificates',
        component: CertificatesComponent,
        data: {title: APP_NAME}
    }
];

export const ROUTING = RouterModule.forRoot(ROUTES, {useHash: true});

