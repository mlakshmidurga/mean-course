import { Injectable } from '@angular/core';
import { Router,CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from "./auth.service";
import { JwtHelperService } from '@auth0/angular-jwt';
 

 

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const allowedRole = route.data.allowedRole;
    console.log(allowedRole);
    const helper = new JwtHelperService();
    const token = localStorage.getItem('token');
    console.log(token)
    const tokenPayload = helper.decodeToken(token);
    if(!this.auth.loggedIn() || tokenPayload.role == allowedRole){
      this.router.navigate(['/admin'])
      return false
    }
    return true;
  }

  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot
  // ): Observable<boolean> | Promise<boolean> | boolean {
  //   const allowedRoles = next.data.allowedRoles;
  //   const isAuthorized = this.auth.isAuthorized(allowedRoles);

  //   if (!isAuthorized) {
  //     this.router.navigate(['accessdenied']);
  //   }

  //   return isAuthorized;
  // }



  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  //     if (this.auth.getIsAuth()) {
  //       return true;
  //     }
  //     this.router.navigate(['/']);
  //     return false;
  //   }
  //   const expectedRole = this.router.role;
  //   // const helper = new JwtHelperService();
  //   const token = localStorage.getItem('token');
  //   // const role = decodeToken(token);
  //   if(!this.auth.getToken() || role !== role){
  //     this.router.navigate(['/events'])
  //     return false
  //   }
  //   return true;
  // }
    
}
