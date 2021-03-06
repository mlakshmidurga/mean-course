import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import {AuthData} from './auth-data.model';
import {environment} from '../../environments/environment';
import { isNullOrUndefined } from 'util';
import { MatCalendarBody } from "@angular/material";

const BACKEND_URL = environment.apiUrl + "/user/";


@Injectable ({
    providedIn: 'root'
})
export class AuthService{
    user: AuthData = {
        email: '',
        password: ''
    }
    private isAuthenticated = false;
    
    private token: string;
    private tokenTimer: any;
    private userId: string;
    private email: string;
    private authStatusListener = new Subject();
    
    currentUser: string;
    constructor(private http: HttpClient, private router: Router){}
    loggedIn(){
        return !!localStorage.getItem('token');
        }
    getToken(){
        return this.token;
    }

    getIsAuth() {
        return this.isAuthenticated;
    }

    getUserId(){
        return this.userId;
    }

    getUserEmail(){
        return this.email;
    }

    getauthStatusListener(){
        return this.authStatusListener.asObservable();
    }

    createUser(email: string, password: string){
        const authData: AuthData = {email: email, password: password}
        
         this.http.post(BACKEND_URL + "/signup", authData).subscribe(() => {
             this.router.navigate(['/']);
         }, error => {
             this.authStatusListener.next(false);
         }
        );
    }
    
    isAdmin(){
        return this.isAuthenticated;
    }
    login(email: string, password: string){
        const authData: AuthData = {email: email, password: password}
        console.log(authData);
        this.http.post<{token: string, expiresIn: number, userId: string, email: string}>(BACKEND_URL + "/login", authData)
        .subscribe(response => {
            const token = response.token;
            this.token = token;
            if(token){
                const expiresInDuration = response.expiresIn;
                this.setAuthTimer(expiresInDuration);
                this.isAuthenticated = true;
                this.userId = response.userId;
                console.log(this.userId);
                this.email = response.email;
                console.log(this.email);
                this.authStatusListener.next(true);
                 const now = new Date();
                 const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
                 console.log(expirationDate);
                 this.saveAuthData(token, expirationDate, this.userId, this.email);
                this.router.navigate(['/']);
            }
           
        }, error => {
            console.log(error);
            this.authStatusListener.next(false);
        })
    }

    autoAuthUser() {
        const authInformation = this.getAuthData();
        if(!authInformation){
            return;
        }
        const now = new Date();
        const expiresIn =authInformation.expirationDate.getTime() - now.getTime();
        
        if(expiresIn > 0){
            this.token = authInformation.token;
            this.isAuthenticated = true;
            this.userId = authInformation.userId;
            
             this.setAuthTimer(expiresIn / 1000);
            this.authStatusListener.next(true);
        }
    }

    logout(){
        this.token = null;
        this.isAuthenticated = false;
        this.authStatusListener.next(false);
        this.userId = null;
        this.email = null;
        clearTimeout(this.tokenTimer);
        this.clearAuthData();
        this.router.navigate(['/']);
       
    }

    private setAuthTimer(duration: number){
        console.log("Setting Timer", + duration);
        this.tokenTimer = setTimeout(() => {
            this.logout();
       }, duration * 1000);
    }

    private saveAuthData(token: string, expirationDate: Date, userId:string, email: string) {
        localStorage.setItem('token', token);
        localStorage.setItem('expiration', expirationDate.toISOString());
        localStorage.setItem('userId', userId);
        localStorage.setItem('email', JSON.stringify(email));
    }

    private clearAuthData(){
        localStorage.removeItem('token');
        localStorage.removeItem('expirationDate');
        localStorage.removeItem('userId');
        localStorage.removeItem('email');
    }

    private getAuthData(){
        const token = localStorage.getItem('token');
        const expirationDate = localStorage.getItem('expiration');
        const userId = localStorage.getItem('userId');
        const email = localStorage.getItem('email');
        if(!token || !expirationDate){
            return;
        }

        return {
            token: token,
            expirationDate: new Date(expirationDate),
            userId: userId,
            email: email
        }
    }

    getCurrentUser(): AuthData{
        let userString=localStorage.getItem('email');
        console.log(userString);
        if(!isNullOrUndefined(userString)){
            let user: AuthData;
            return user;
        }else{
            return null;
        }
    
        }
       

        
}