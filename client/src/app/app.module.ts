import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from './shared/modal/modal.component';
import { BOOTSTRAP_TOKEN } from './utils/bootstrap.token';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { UserProfilePageComponent } from './pages/user-profile-page/user-profile-page.component';
import { UsersListPageComponent } from './pages/users-list-page/users-list-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { HeaderComponent } from './components/header/header.component';
import { LogoComponent } from './shared/logo/logo.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

declare let bootstrap: any;

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ModalComponent,
    LoginPageComponent,
    LogoComponent,
    UserProfilePageComponent,
    UsersListPageComponent,
    NotFoundPageComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [
    {provide: BOOTSTRAP_TOKEN, useValue: bootstrap}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
