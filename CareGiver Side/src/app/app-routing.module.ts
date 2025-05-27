import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from "./auth.guard";
import { MemoriesPage } from './memories/memories.page';

const routes: Routes = [
  
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
   {
      path: '',
      loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
      canActivate: [AuthGuard]  // Protecting the tabs
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'user-profile',
    loadChildren: () => import('./user-profile/user-profile.module').then( m => m.UserProfilePageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'memories',
    loadChildren: () => import('./memories/memories.module').then( m => m.MemoriesPageModule)
  },
  {
    path: 'letters',
    loadChildren: () => import('./letters/letters.module').then( m => m.LettersPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
