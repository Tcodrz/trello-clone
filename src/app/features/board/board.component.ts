import { DarkTheme } from './../../core/interface/themes';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Icons } from 'src/app/ui-components/button/icon/icons';
import { Board } from './../../core/interface/board.interface';
import { List } from './../../core/interface/list.interface';
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
  ) { }
  ngOnDestroy(): void {
    this.boardService.setCurrentBoard(null);
  }
  ngOnInit(): void {
    this.boardService.init();
    this.board$ = this.boardService.getCurrentBoard();
    // this.board$.subscribe(board => { // add DarkTheme to current board
    //   if (!!board) {
    //     debugger;
    //     board.theme = DarkTheme;
    //     this.boardService.updateBoard(board);
    //   }
    // })
  }
  onUpdateLists(lists: List[]): void {
    this.boardService.updateLists(lists);
  }
}
