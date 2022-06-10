import { UserGuard } from '../../core/guards/user.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent, canActivate: [UserGuard], children: [
      { path: 'boards', loadChildren: () => import('./boards/boards.module').then(m => m.BoardsModule) },
      { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule), canLoad: [UserGuard] },
      { path: 'templates', loadChildren: () => import('./templates/templates.module').then(m => m.TemplatesModule), canLoad: [UserGuard] },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
