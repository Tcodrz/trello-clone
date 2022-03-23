import { RouterModule } from '@angular/router';
import { ButtonModule } from './../../../ui-components/button/button.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BoardsRoutingModule } from './boards-routing.module';
import { BoardsComponent } from './boards.component';

@NgModule({
  declarations: [
    BoardsComponent,
  ],
  imports: [
    BoardsRoutingModule,
    ButtonModule,
    CommonModule,
    RouterModule,
  ]
})
export class BoardsModule { }
