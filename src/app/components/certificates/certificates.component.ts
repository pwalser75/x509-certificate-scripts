import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'certificates',
    templateUrl: 'certificates.html'
})
export class CertificatesComponent implements OnInit {

    form: FormGroup;
    certType: string;

    settings: any;
    caValid: boolean;
    certValid: boolean;

    constructor(private fb: FormBuilder, private router: Router) {
    }

    ngOnInit(): void {
        this.form = this.fb.group(
            {
                "caKeystore": ['', Validators.compose(
                    [Validators.required, Validators.minLength(5), Validators.maxLength(100), Validators.pattern(".+\\.jks")]
                )],
                "caKeystorePass": ['', Validators.compose(
                    [Validators.required, Validators.minLength(6), Validators.maxLength(64)]
                )],
                "caKeystoreKeyPass": ['', Validators.compose(
                    [Validators.required, Validators.minLength(6), Validators.maxLength(64)]
                )],
                "caAlias": ['', Validators.compose(
                    [Validators.required, Validators.minLength(3), Validators.maxLength(20)]
                )],
                "certType": ['', Validators.compose(
                    [Validators.required]
                )],
                "keystore": ['', Validators.compose(
                    [Validators.required, Validators.minLength(5), Validators.maxLength(100), Validators.pattern(".+\\.jks")]
                )],
                "keystorePass": ['', Validators.compose(
                    [Validators.required, Validators.minLength(6), Validators.maxLength(64)]
                )],
                "keystoreKeyPass": ['', Validators.compose(
                    [Validators.required, Validators.minLength(6), Validators.maxLength(64)]
                )],
                "alias": ['', Validators.compose(
                    [Validators.required, Validators.minLength(3), Validators.maxLength(20)]
                )],
                "keyAlg": ['', Validators.compose(
                    [Validators.required, Validators.pattern("RSA|EC")]
                )],
                "keySize": ['', Validators.compose(
                    [Validators.required, Validators.minLength(1), Validators.maxLength(10), Validators.pattern("[0-9]+")]
                )],
                "validityDays": ['', Validators.compose(
                    [Validators.required, Validators.minLength(1), Validators.maxLength(10), Validators.pattern("[0-9]+")]
                )],
                "truststore": ['', Validators.compose(
                    [Validators.required, Validators.minLength(5), Validators.maxLength(100), Validators.pattern(".+\\.jks")]
                )],
                "truststorePass": ['', Validators.compose(
                    [Validators.required, Validators.minLength(6), Validators.maxLength(64)]
                )],
                "serverNames": ['', Validators.compose(
                    [Validators.required, Validators.minLength(3), Validators.maxLength(200), Validators.pattern("\\S+")]
                )],
                "dnameCN": ['', Validators.compose(
                    [Validators.required, Validators.minLength(1), Validators.maxLength(20)]
                )],
                "dnameOU": ['', Validators.compose(
                    [Validators.maxLength(20)]
                )],
                "dnameO": ['', Validators.compose(
                    [Validators.maxLength(20)]
                )],
                "dnameC": ['', Validators.compose(
                    [Validators.maxLength(2)]
                )]
            }
        );

        var initialFormValue: any = {
            certType: '',
            caKeystore: 'ca-keystore.jks',
            caKeystorePass: '',
            caKeystoreKeyPass: '',
            caAlias: 'test-ca',
            keystore: '{alias}-keystore.jks',
            keystorePass: 'Secret-007',
            keystoreKeyPass: 'Secret-007',
            alias: '',
            keyAlg: 'RSA',
            keySize: '2048',
            validityDays: '1830',
            truststore: '{alias}-truststore.jks',
            truststorePass: 'Secret-007',
            serverNames: 'dn:localhost,ip:127.0.0.1',
            dnameCN: '{alias}',
            dnameOU: 'dev',
            dnameO: 'frostnova.ch',
            dnameC: 'CH'
        }

        this.form.setValue(initialFormValue);

        this.form.valueChanges.subscribe(val => {
            this.updateScripts(val);
        });
        this.updateScripts(initialFormValue);
    }

    private updateScripts(val: any) {
        console.log("form valid: " + JSON.stringify(this.form.valid));
        console.log("updateScripts: " + JSON.stringify(val));
        this.certType = val.certType;
        this.settings = val;

        this.caValid = val.caKeystore && val.caKeystorePass && val.caKeystoreKeyPass && val.caAlias;
        this.certValid = val.keystore && val.keystorePass && val.alias && val.keyAlg && val.keySize
            && val.validityDays && val.truststore && val.truststorePass && val.dnameCN;

        if (this.certValid) {
            this.settings.keystore = this.settings.keystore.replace('{alias}', this.settings.alias);
            this.settings.truststore = this.settings.truststore.replace('{alias}', this.settings.alias);
            this.settings.dnameCN = this.settings.dnameCN.replace('{alias}', this.settings.alias);
            this.settings.dnameOU = this.settings.dnameOU.replace('{alias}', this.settings.alias);
            this.settings.dnameO = this.settings.dnameO.replace('{alias}', this.settings.alias);
            this.settings.dnameC = this.settings.dnameC.replace('{alias}', this.settings.alias);

            this.settings.dname = 'CN=' + this.settings.dnameCN +
                (this.settings.dnameOU ? ',OU=' + this.settings.dnameOU : '') +
                (this.settings.dnameO ? ',O=' + this.settings.dnameO : '') +
                (this.settings.dnameC ? ',C=' + this.settings.dnameC : '');

            this.settings.eku = '';
            if (this.settings.certType == 'SERVER') {
                this.settings.eku = 'serverAuth,clientAuth';
            }
            if (this.settings.certType == 'CLIENT') {
                this.settings.eku = 'clientAuth';
            }
        }
    }
}