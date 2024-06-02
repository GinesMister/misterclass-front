import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LoginComponent } from './pages/login-signup/login/login.component';
import { SingUpComponent } from './pages/login-signup/sing-up/sing-up.component';

const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'iniciar-sesion', component: LoginComponent},
  {path: 'registrar', component: SingUpComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
