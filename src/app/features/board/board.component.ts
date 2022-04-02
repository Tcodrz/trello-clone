import { CardService } from './../../core/services/card.service';
import { Card } from './../../core/interface/card.interface';
import { Icons } from 'src/app/ui-components/button/icon/icons';
import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { Board } from './../../core/interface/board.interface';
import { BoardsService } from './../../core/services/boards.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardComponent implements OnInit, OnDestroy {
  board$: Observable<Board | null> = of(null);
  Icons = Icons;
  constructor(
    private boardService: BoardsService,
    private cardService: CardService,
  ) { }
  ngOnDestroy(): void {
    this.boardService.setCurrentBoard(null);
  }
  ngOnInit(): void {
    this.boardService.init();
    this.board$ = this.boardService.getCurrentBoard();
  }


}
