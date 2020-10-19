import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { knownFolders } from 'file-system'
import { SslPinning } from 'nativescript-ssl-pinning'

@Component({
    selector: "Home",
    templateUrl: "./home.component.html"
})

export class HomeComponent implements OnInit {
    private serverUrl = "https://sky90.lss.emc.com:8443/api/v2/login";
    
    private count = 0;
    private apires: any;
    constructor(private http : HttpClient) {
        // Use the component constructor to inject providers.
       // setInterval(()=>{this.count = this.count++},1000)
       let dir = knownFolders.currentApp().getFolder('assets')
    let certificate = dir.getFile('ppdm.crt').path
    SslPinning.enableSSLPinning({ host: 'sky90.lss.emc.com', certificate })
    }

    ngOnInit(): void {
        // Init your component properties here.
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    login(evt): void {
        console.log("login");
        this.apires = "login"
       // console.log("user : "+ this.textFieldValue);
        //console.log("password : "+ this.passwordFieldValue);
        let headers = new HttpHeaders({
            'Content-Type': 'application/json;charset=utf-8',
            'Access-Control-Allow-Origin': '*',
            'Content-Length':'44',
            'Host': 'sky90.lss.emc.com'
         });
        
        const postBody = {
            username: "admin",
            password: "Changeme@1"
        }
        const options = {
            headers : headers,
            body : postBody
        }
         this.http.post(this.serverUrl, options).subscribe((result) => {
             console.log("res kj");
             console.log(result);
             this.apires = JSON.stringify(result)
        }, (error) => {
            console.log("error");
            console.log(error);
            this.apires = JSON.stringify(error)
        });
        // this.http.get(this.serverUrl, { headers: headers }).subscribe((res)=>{
        //     console.log(res);
        // })
        
    }
}
export interface HttpsSSLPinningOptions {
	host: 'sky90.lss.emc.com'
	allowInvalidCertificates?: true
	validatesDomainName?: boolean
}
