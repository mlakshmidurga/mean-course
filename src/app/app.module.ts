import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import {HeaderComponent} from '../header/header.component';
import {PostService} from '../posts/post.service';
import {PostModule} from '../posts/post.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AngularMaterialModule} from './angular-material.module';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';

import { AuthInterceptor } from './auth/auth-interceptor';
import {ErrorInterceptor} from './error-interceptor';
import { ErrorComponent } from '../error/error.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ErrorComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    HttpClientModule,
    PostModule
    
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent]
})
export class AppModule { }
