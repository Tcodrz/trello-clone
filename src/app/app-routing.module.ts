import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { LoggedInGuard } from './core/guards/logged-in.guard';
import { UserGuard } from './core/guards/user.guard';

const routes: Routes = [
  { path: 'home', loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule), canLoad: [LoggedInGuard] },
  { path: 'login', loadChildren: () => import('./features/login/login.module').then(m => m.LoginModule), canLoad: [LoggedInGuard] },
  { path: 'register', loadChildren: () => import('./features/register/register.module').then(m => m.RegisterModule), canLoad: [LoggedInGuard] },
  { path: 'dashboard', loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule), canLoad: [UserGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
