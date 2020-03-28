import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { AdminloginComponent} from './adminlogin/adminlogin.component';
import { RegisterComponent} from './register/register.component';
import {ClassroomComponent} from './classroom/classroom.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [

  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'admindashboard', component: AdmindashboardComponent },
  { path: 'adminlogin', component: AdminloginComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'classroom', component: ClassroomComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
