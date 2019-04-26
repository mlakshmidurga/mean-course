import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PostListComponent} from '../posts/post-list/post-list.component';
import { PostCreateComponent } from '../posts/post-create/post-create.component';
import { AuthGuard } from './auth/auth.guard';
import { AdminGuard } from './auth/admin.guard';
import { AhomeComponent } from './auth/admin/ahome/ahome.component';
import { JwtHelperService } from '@auth0/angular-jwt';
const routes: Routes = [

    {path:'', component: PostListComponent, redirectTo: '', pathMatch: 'full'},
    {path:'create', component: PostCreateComponent, canActivate: [AuthGuard]},
    {path: 'edit/:postId', component: PostCreateComponent, canActivate: [AuthGuard]},
    {path: 'auth', loadChildren: "./auth/auth.module#AuthModule"},
    {
        path: 'auth',
        canActivate: [AdminGuard],
        loadChildren: "./auth/auth.module#AuthModule",
        data: {
          allowedRole: 'user'
        }
        
       
      }

];
@NgModule({

imports: [RouterModule.forRoot(routes)],
exports: [RouterModule],
providers: [AuthGuard,AdminGuard, JwtHelperService]

})
export class AppRoutingModule{

}