import { HomeComponent } from './home/home.component';
import { TemplatesComponent } from './templates/templates.component';
import { BoardsComponent } from './boards/boards.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
      { path: 'boards', component: BoardsComponent },
      { path: 'templates', component: TemplatesComponent },
      { path: 'home', component: HomeComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
