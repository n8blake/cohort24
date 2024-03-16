import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HttpClientModule } from '@angular/common/http';
import { ModalComponent } from './shared/modal/modal.component';
import { BOOTSTRAP_TOKEN } from './utils/bootstrap.token';

declare let bootstrap: any;

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    {provide: BOOTSTRAP_TOKEN, useValue: bootstrap}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
