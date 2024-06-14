import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { LoginComponent } from './pages/login-signup/login/login.component';
import { SingUpComponent } from './pages/login-signup/sing-up/sing-up.component';
import { CreateSubjectComponent } from './pages/create-subject/create-subject.component';
import { SubscribeSubjectComponent } from './components/subscribe-subject/subscribe-subject.component';
import { ClassDetailsComponent } from './pages/class-details/class-details.component';
import { UnitDetailsComponent } from './pages/unit-details/unit-details.component';

const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'iniciar-sesion', component: LoginComponent},
  {path: 'registrar', component: SingUpComponent},
  {path: 'crear-clase', component: CreateSubjectComponent},
  {path: 'subscribirse-clase', component: SubscribeSubjectComponent},
  {path: 'clase/:id', component: ClassDetailsComponent},
  {path: 'clase/:id/unidad/:unitId', component: UnitDetailsComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
