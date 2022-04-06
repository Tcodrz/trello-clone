import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BoardsRoutingModule } from './boards-routing.module';
import { BoardsComponent } from './boards.component';
import { ButtonModule } from '@ui-components';

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
