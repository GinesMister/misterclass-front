import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderPageComponent } from './components/header-page/header-page.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { SingUpComponent } from './pages/login-signup/sing-up/sing-up.component';
import { LoginComponent } from './pages/login-signup/login/login.component';
import { AuthService } from './services/server-petitions/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginInfoService } from './services/login-info.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderPageComponent,
    HomepageComponent,
    SingUpComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
    LoginInfoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
