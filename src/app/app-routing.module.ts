import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeAddComponent } from './employee-add/employee-add.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';

import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'list/:username',
    component: EmployeeDetailComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'list',
    component: EmployeeListComponent,
    canActivate: [AuthGuard],
  },
  { path: 'add', component: EmployeeAddComponent, canActivate: [AuthGuard] },
  { path: '', pathMatch: 'prefix', redirectTo: 'list' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
