import { Component, OnInit, OnDestroy } from "@angular/core";
import {NgForm} from "@angular/forms";
import { AuthService } from "../auth.service";
import { Subscription } from "rxjs";

@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy{
    isLoading = false;

    private authStatusSub: Subscription;

    ngOnInit(){
        this.authStatusSub = this.authservice.getauthStatusListener().subscribe(
            authStatus => {
                this.isLoading = false;
            }
        );
    }
   
    constructor(public authservice: AuthService){}


    onLogin(form: NgForm){
        
       if(form.invalid){
           return
       }
       this.isLoading = true;
       this.authservice.login(form.value.email, form.value.password);
       console.log(form.value);
    }

    ngOnDestroy(){
        this.authStatusSub.unsubscribe();
    }
}