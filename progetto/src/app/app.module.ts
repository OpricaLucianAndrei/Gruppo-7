import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import { Route, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { SigninComponent } from './auth/signin/signin.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PostEditComponent } from './components/post-edit/post-edit.component';
import { PostDetailsComponent } from './components/post-details/post-details.component';
// import { TokenInterceptor } from './auth/token.interceptor';

// const routes: Route[] = [
//   {
//     path: '',
//     component: HomeComponent,
//     // canActivate: [AuthGuard],
//   },
//   {
//     path: 'signin',
//     component: SigninComponent,
//   // canDeactivate: [AuthGuard] 
//   },
//   {
//     path: 'login',
//     component: LoginComponent,
//     // canDeactivate: [AuthGuard]
//   },
//   {
//     path: 'post-details',
//     component: PostDetailsComponent,
//     // canActivate: [AuthGuard]
//   },
//   {
//     path: 'post-edit',
//     component: PostEditComponent,
//     // canActivate: [AuthGuard]
//   },

// ]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SigninComponent,
    HomeComponent,
NavbarComponent,
    PostEditComponent,
    PostDetailsComponent
  ],
  imports: [
    BrowserModule,
    // RouterModule.forRoot(routes),
    NgModule, 
    FormsModule, 
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
