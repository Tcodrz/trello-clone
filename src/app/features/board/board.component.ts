import { Component, OnInit } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { Board } from './../../core/interface/board.interface';
import { BoardsService } from './../../core/services/boards.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  board$: Observable<Board | null> = of(null);
  constructor(
    private boardService: BoardsService,
  ) { }

  ngOnInit(): void {
    this.boardService.init();
    this.board$ = this.boardService.getCurrentBoard();
  }

}
