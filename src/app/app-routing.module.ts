import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { isAuthenticatedGuard } from './auth/guards/isAuthenticated.guard';

const routes: Routes = [

  {
    path: 'auth',
    // guards fucntion guards
    loadChildren:() => import('./auth/auth.module').then(module => module.AuthModule),
  },
  {
    path: 'dashboard',
    canActivate: [ isAuthenticatedGuard ],
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
