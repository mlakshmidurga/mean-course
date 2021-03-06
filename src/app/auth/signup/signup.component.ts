import { Component, OnInit, OnDestroy } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "../auth.service";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";


@Component({
templateUrl: "./signup.component.html",
styleUrls: ["./signup.component.css"]
})

export class SignupComponent implements OnInit, OnDestroy{
    isLoading = false;
    private authStatusSub: Subscription;

    ngOnInit(){
        this.authStatusSub = this.authservice.getauthStatusListener().subscribe(
            authStatus => {
                this.isLoading = false;
            }
        );
    }
   
 constructor(public authservice: AuthService, private router: Router){}

   
     onSignup(form: NgForm){
        if(form.invalid){
            return;
        }
        this.isLoading = true;
        this.authservice.createUser(form.value.email, form.value.password);
        console.log(form.value);
     }

     ngOnDestroy(){
         this.authStatusSub.unsubscribe();
     }
}