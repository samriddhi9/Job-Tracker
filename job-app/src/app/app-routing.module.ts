import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { JobDataComponent } from './job-data/job-data.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './authentication/auth.guard';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' ,canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'auth/callback', component: LoginComponent },
  { path: 'create', component: CreateComponent,canActivate: [AuthGuard] },
  { path: 'edit/:id', component: EditComponent, canActivate: [AuthGuard]},
  { path: 'list', component: JobDataComponent,canActivate: [AuthGuard] }  ,
  { path: "", component: DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
