import {Component, OnInit, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../app/auth/auth.service';

@Component({
 selector: 'app-header',
 templateUrl: './header.component.html',
 styleUrls:['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
    userIsAuthenticated;
    private authListenerSubs: Subscription;

    constructor(private authservice: AuthService){}

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