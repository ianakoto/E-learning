import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminloginComponent} from './adminlogin/adminlogin.component';
import { RegisterComponent} from './register/register.component';
import {ClassroomComponent} from './classroom/classroom.component';
import { AuthGuard } from './auth.guard';
import { DefaultComponent } from './layouts/default/default.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { ManageclassesComponent } from './modules/manageclasses/manageclasses.component';
import { ManageusersComponent } from './modules/manageusers/manageusers.component';
// tslint:disable-next-line:max-line-length
import { DashboardnotificationandissueComponent } from 'src/app/modules/dashboardnotificationandissue/dashboardnotificationandissue.component';

import { ActivityComponent } from 'src/app/modules/activity/activity.component';
import { ClasshomeComponent } from './modules/classhome/classhome.component';
import { DefaluthomeComponent } from './home/defaluthome/defaluthome.component';
import { TopicshomeComponent } from './modules/topicshome/topicshome.component';
import { LessonshomeComponent } from './modules/lessonshome/lessonshome.component';
import { SubjectComponent } from './modules/subject/subject.component';

const routes: Routes = [

  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'admindashboard', component: DefaultComponent, children: [
    {path: '', pathMatch: 'full', redirectTo: 'dashboard' },
    {path: 'dashboard', component: DashboardComponent },
    {path: 'manageclass', component: ManageclassesComponent },
    {path: 'manageusers', component: ManageusersComponent },
    {path: 'activity', component: ActivityComponent },
    {path: 'notificationandissues', component: DashboardnotificationandissueComponent }

  ]},
  // { path: 'adminlogin', component: AdminloginComponent, canActivate: [AuthGuard] },
  { path: 'adminlogin', component: AdminloginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'classroom', component: DefaluthomeComponent, children: [
    {path: '', pathMatch: 'full', redirectTo: 'classdashboard' },
    {path: 'classdashboard', component: ClasshomeComponent },
    {path: 'subjects', component: SubjectComponent },
    {path: 'topics', component: TopicshomeComponent },
    {path: 'lessons', component: LessonshomeComponent },
    {path: 'tutor', component: ClassroomComponent}

  ] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
