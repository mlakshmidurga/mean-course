import {Component, OnInit, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../app/auth/auth.service';
import { AuthData } from 'src/app/auth/auth-data.model';
import { isNullOrUndefined } from 'util';
import {NgForm} from "@angular/forms";
@Component({
 selector: 'app-header',
 templateUrl: './header.component.html',
 styleUrls:['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
    userIsAuthenticated;
    private authListenerSubs: Subscription;
    currentUser: AuthData;
    user: AuthData[] = [];
  
    constructor(private authservice: AuthService){
        this.currentUser = JSON.parse(localStorage.getItem('email'));
       
    }
    
    ngOnInit() {
        this.user = JSON.parse(localStorage.getItem('email'))
        console.log(this.user);
        this.userIsAuthenticated = this.authservice.getIsAuth();
        this.authListenerSubs = this.authservice
        .getauthStatusListener()
        .subscribe(isAuthenticated => {
            this.userIsAuthenticated = isAuthenticated;
        });
    }
   
    ngOnDestroy() {
      this.authListenerSubs.unsubscribe();
        
    }
  
    onLogout(){
        this.authservice.logout();
    }

    
}