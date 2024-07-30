import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: 'auth',
    // guards fucntion guards
    loadChildren:() => import('./auth/auth.module').then(module => module.AuthModule),
  },
  {
    path: 'dashboard',
    // guards fucntion guards
    loadChildren:() => import('./dashboard/dashboard.module').then(module => module.DashboardModule),
  },
  {
    path: '**',
    redirectTo: 'auth'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
