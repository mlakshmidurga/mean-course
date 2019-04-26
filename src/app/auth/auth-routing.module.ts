import { NgModule } from "@angular/core";
import {Routes,RouterModule} from "@angular/router";
import {LoginComponent} from '../auth/login/login.component';
import {SignupComponent} from '../auth/signup/signup.component'
import { AhomeComponent } from './admin/ahome/ahome.component';
import { AuthGuard } from "./auth.guard";
import { AdminGuard } from "./admin.guard";
import { JwtModule } from '@auth0/angular-jwt';
import { AccessDeniedComponent } from "./access-denied/access-denied/access-denied.component";
const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'signup', component: SignupComponent},
    {
      path: 'admin',
      component: AhomeComponent,
      canActivate: [AdminGuard],
      data: {
        allowedRole: 'user'
      }
    },
    {
      path: 'accessdenied',
      component: AccessDeniedComponent,
      data: {}
    },
]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    JwtModule.forRoot({})
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule{

}