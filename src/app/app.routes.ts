import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { emailResetResolver } from './resolvers/email-reset.resolver';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'signup',
    loadComponent: () => import('./pages/signup/signup.page').then( m => m.SignupPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'reset-email',
    loadComponent: () => import('./pages/reset-email/reset-email.page').then( m => m.ResetEmailPage),
    resolve: {
      validToken: emailResetResolver
    }
  },
  {
    path: 'error',
    loadComponent: () => import('./pages/error/error.page').then( m => m.ErrorPage)
  },


];
