import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Icons } from '@ui-components';
import { Observable, of } from 'rxjs';
import { BoardsStore } from 'src/app/state/boards/boards.store';
import { Board } from './../../core/interface/board.interface';
import { List } from './../../core/interface/list.interface';
import { BoardsService } from './../../core/services/boards.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardComponent implements OnInit {
  board$: Observable<Board | null> = of(null);
  Icons = Icons;
  constructor(
    private activeRoute: ActivatedRoute,
    private boardService: BoardsService,
    private boardStore: BoardsStore,

  ) { }
  ngOnInit(): void {
    this.activeRoute.params.subscribe((params: any) => {
      this.boardStore.init(params.workspaceID);
      const boardID = params.boardID;
      this.board$ = this.boardService.getBoard(boardID);
    });
  }
  onUpdateLists(lists: List[]): void {
    this.boardService.updateLists(lists);
  }
}
