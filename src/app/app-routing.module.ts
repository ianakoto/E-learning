import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminloginComponent} from './adminlogin/adminlogin.component';
import { RegisterComponent} from './register/register.component';
import {ClassroomComponent} from './classroom/classroom.component';
import { AuthGuard } from './auth.guard';
import {AdmindashboardComponent} from './admindashboard/admindashboard.component';

const routes: Routes = [

  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'adminlogin', component: AdminloginComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'classroom', component: ClassroomComponent },
  { path: 'admindashboard', component: AdmindashboardComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
