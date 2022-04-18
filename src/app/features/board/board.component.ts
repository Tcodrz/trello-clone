import { ListsStore } from './../../state/lists/lists.store';
import { ListsQuery } from './../../state/lists/lists.query';
import { CardComponent } from './../card/card.component';
import { ModalService } from './../../../../projects/ui-components/src/lib/modal/modal.service';
import { GotoService } from './../../core/services/goto.service';
import { Card } from './../../core/interface/card.interface';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Icons } from '@ui-components';
import { Observable, of, tap } from 'rxjs';
import { BoardsStore } from 'src/app/state/boards/boards.store';
import { Board } from './../../core/interface/board.interface';
import { List } from './../../core/interface/list.interface';
import { BoardsService } from './../../core/services/boards.service';
import { CARD_MODAL } from '../card/card-modal.config';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardComponent implements OnInit {
  board$: Observable<Board | null> = of(null);
  Icons = Icons;
  boardID: any;
  lists$: Observable<List[]> = of([]);
  constructor(
    private activeRoute: ActivatedRoute,
    private boardService: BoardsService,
    private boardStore: BoardsStore,
    private goto: GotoService,
    private modalService: ModalService,
    private listsQuery: ListsQuery,
    private listsStore: ListsStore,
  ) { }
  ngOnInit(): void {
    this.activeRoute.params.subscribe((params: any) => {
      this.boardStore.init(params.workspaceID);
      this.boardID = params.boardID;
      this.board$ = this.boardService.getBoard(this.boardID).pipe(
        tap(board => { if (board) this.listsStore.setLists(board) })
      );
      this.lists$ = this.listsQuery.lists$;
      if (params.cardID) {
        this.modalService.open({
          ...CARD_MODAL,
          component: CardComponent
        })
      }
    });
  }
  onUpdateLists(lists: List[]): void {
    this.boardService.updateLists(lists);
  }
  onCardOpen(card: Card): void {
    const boardState = this.boardStore.getValue();
    const board = boardState.boards.find(board => board.id === this.boardID);
    if (!board) {
      debugger; // should not occur
      return;
    }
    this.goto.card(card.id, board.id, board.workspaceID);
  }
}
