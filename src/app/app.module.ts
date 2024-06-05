import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderPageComponent } from './components/header-page/header-page.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { SingUpComponent } from './pages/login-signup/sing-up/sing-up.component';
import { LoginComponent } from './pages/login-signup/login/login.component';
import { AuthService } from './services/server-petitions/api/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginInfoService } from './services/login-info.service';
import { CreateSubjectComponent } from './pages/create-subject/create-subject.component';
import { SubjectService } from './services/subject.service';
import { SubjectApiService } from './services/server-petitions/api/subject-api.service';
import { UserApiService } from './services/server-petitions/api/user-api.service';
import { SubscribeSubjectComponent } from './pages/subscribe-subject/subscribe-subject.component';
import { ClassDetailsComponent } from './pages/class-details/class-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderPageComponent,
    HomepageComponent,
    SingUpComponent,
    LoginComponent,
    CreateSubjectComponent,
    SubscribeSubjectComponent,
    ClassDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
    LoginInfoService,
    SubjectApiService,
    UserApiService,
    SubjectService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
