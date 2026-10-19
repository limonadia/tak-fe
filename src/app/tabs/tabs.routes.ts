import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'profile',
        loadComponent: () => import('../profile/profile.page').then((m) => m.ProfilePage),
      },
      {
        path: 'profile/analytics',
        loadComponent: () => import('../pages/analytics/analytics.page').then((m) => m.AnalyticsPage),
      },
      {
        path: 'profile/blocked-users',
        loadComponent: () => import('../pages/blocked-users/blocked-users.page').then((m) => m.BlockedUsersPage),
      },
      {
        path: 'profile/change-email',
        loadComponent: () => import('../pages/change-email/change-email.page').then((m) => m.ChangeEmailPage),
      },
      {
        path: 'profile/change-password',
        loadComponent: () => import('../pages/change-password/change-password.page').then((m) => m.ChangePasswordPage),
      },
      {
        path: 'profile/connections',
        loadComponent: () => import('../pages/connections/connections.page').then((m) => m.ConnectionsPage),
      },
      {
        path: 'profile/edit-profile',
        loadComponent: () => import('../pages/edit-profile/edit-profile.page').then((m) => m.EditProfilePage),
      },
      {
        path: 'profile/language',
        loadComponent: () => import('../pages/language/language.page').then((m) => m.LanguagePage),
      },
      {
        path: 'profile/theme',
        loadComponent: () => import('../pages/theme/theme.page').then((m) => m.ThemePage),
      },
      {
        path: 'discover',
        loadComponent: () =>
          import('../discover/discover.page').then((m) => m.DiscoverPage),
      },
      {
        path: 'discover/view-all/:id',
        loadComponent: () => import('../pages/view-all/view-all.page').then((m) => m.ViewAllPage)
      },
      {
        path: 'home',
        loadComponent: () =>
          import('../home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'home/view-all/:id',
        loadComponent: () => import('../pages/view-all/view-all.page').then((m) => m.ViewAllPage)
      },
      {
        path: 'events',
        loadComponent: () =>
          import('../events/events.page').then((m) => m.EventsPage),
      },
      {
        path: 'events/event-details/:id',
        loadComponent: () => import('../pages/event-details/event-details.page').then((m) => m.EventDetailsPage)
      },
      {
        path: 'groups',
        loadComponent: () =>
          import('../groups/groups.page').then((m) => m.GroupsPage),
      },
      {
        path: 'groups/group-details/:id',
        loadComponent: () => import('../pages/group-details/group-details.page').then((m) => m.GroupDetailsPage)
      },
      {
        path: '',
        redirectTo: '/tabs/profile',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/profile',
    pathMatch: 'full',
  },
];
