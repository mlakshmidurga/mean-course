import {Component, OnInit, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../app/auth/auth.service';
import { AuthData } from 'src/app/auth/auth-data.model';
import { isNullOrUndefined } from 'util';
@Component({
 selector: 'app-header',
 templateUrl: './header.component.html',
 styleUrls:['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
    userIsAuthenticated;
    private authListenerSubs: Subscription;
    user: AuthData;
   
    constructor(private authservice: AuthService){
        this.user=this.authservice.getCurrentUser();
        console.log(this.user);
        this.user = JSON.parse(localStorage.getItem('currentUser'))
        console.log(this.user);
    }
    
    ngOnInit() {
     
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