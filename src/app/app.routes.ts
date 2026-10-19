import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'language',
    loadComponent: () => import('./pages/language/language.page').then( m => m.LanguagePage)
  },
  {
    path: 'connections',
    loadComponent: () => import('./pages/connections/connections.page').then( m => m.ConnectionsPage)
  },
  {
    path: 'theme',
    loadComponent: () => import('./pages/theme/theme.page').then( m => m.ThemePage)
  },
  {
    path: 'analytics',
    loadComponent: () => import('./pages/analytics/analytics.page').then( m => m.AnalyticsPage)
  },
  {
    path: 'blocked-users',
    loadComponent: () => import('./pages/blocked-users/blocked-users.page').then( m => m.BlockedUsersPage)
  },
  {
    path: 'change-email',
    loadComponent: () => import('./pages/change-email/change-email.page').then( m => m.ChangeEmailPage)
  },
  {
    path: 'edit-profile',
    loadComponent: () => import('./pages/edit-profile/edit-profile.page').then( m => m.EditProfilePage)
  },
  {
    path: 'change-password',
    loadComponent: () => import('./pages/change-password/change-password.page').then( m => m.ChangePasswordPage)
  },
  {
    path: 'view-all',
    loadComponent: () => import('./pages/view-all/view-all.page').then( m => m.ViewAllPage)
  },
  {
    path: 'event-details',
    loadComponent: () => import('./pages/event-details/event-details.page').then( m => m.EventDetailsPage)
  },
  {
    path: 'group-details',
    loadComponent: () => import('./pages/group-details/group-details.page').then( m => m.GroupDetailsPage)
  },
];
