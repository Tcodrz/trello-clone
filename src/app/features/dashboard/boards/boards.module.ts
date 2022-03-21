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
    CommonModule,
  ]
})
export class BoardsModule { }
