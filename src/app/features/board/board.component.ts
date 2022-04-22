import { CardService } from './../../core/services/card.service';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Icons } from '@ui-components';
import { Observable, of, tap } from 'rxjs';
import { BoardsStore } from 'src/app/state/boards/boards.store';
import { CARD_MODAL } from '../card/card-modal.config';
import { ModalService } from './../../../../projects/ui-components/src/lib/modal/modal.service';
import { Board } from './../../core/interface/board.interface';
import { Card } from './../../core/interface/card.interface';
import { List } from './../../core/interface/list.interface';
import { BoardsService } from './../../core/services/boards.service';
import { GotoService } from './../../core/services/goto.service';
import { ListsQuery } from './../../state/lists/lists.query';
import { ListsStore } from './../../state/lists/lists.store';
import { CardComponent } from './../card/card.component';

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
  workspaceID: any;
  cardID: any;
  constructor(
    private activeRoute: ActivatedRoute,
    private boardService: BoardsService,
    private boardStore: BoardsStore,
    private goto: GotoService,
    private modalService: ModalService,
    private listsQuery: ListsQuery,
    private listsStore: ListsStore,
    private cardService: CardService,
  ) { }
  ngOnInit(): void {
    this.activeRoute.params.subscribe((params: any) => {
      this.workspaceID = params.workspaceID;
      this.boardID = params.boardID;
      this.boardStore.init(this.workspaceID);
      this.board$ = this.boardService.getBoard(this.boardID).pipe(
        tap(board => { if (board) this.listsStore.setLists(board) })
      );
      this.lists$ = this.listsQuery.lists$;
      if (params.cardID) {
        this.cardID = params.cardID;
        this.showCard();
      }
    });
  }
  showCard() {
    this.modalService.open({
      ...CARD_MODAL,
      component: CardComponent,
      cbOnClose: () => {
        this.cardService.saveCard();
        this.goto.cardToggle(this.cardID);
      }
    });
  }
  onUpdateLists(lists: List[]): void {
    this.boardService.updateLists(lists);
  }
  onCardOpen(card: Card): void {
    this.cardID = card.id;
    this.goto.cardToggle(this.cardID);
    this.showCard();
  }
}
