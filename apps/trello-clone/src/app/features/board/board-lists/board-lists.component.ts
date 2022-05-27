import {Icons, MenuItems} from '@ui-components';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {Card, List} from '@trello-clone/trello-interface';
import {BoardsService} from '../../../core/services/boards.service';
import {ListsStore} from '../../../state/lists/lists.store';

@Component({
  selector: 'app-board-lists',
  templateUrl: './board-lists.component.html',
  styleUrls: ['./board-lists.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardListsComponent {
  @Input() set lists(value: List[] | null) {
    if (value) this._lists = value;
  };
  @Output() updateLists: EventEmitter<List[]> = new EventEmitter<List[]>();
  @Output() openCard: EventEmitter<Card> = new EventEmitter<Card>();
  _lists: List[] = [];
  Icons = Icons;
  listMenu: MenuItems[] = [{
    headline: '',
    items: [
      {
        label: 'add card',
      }
    ]
  }
  ]
  constructor(
    private boardService: BoardsService,
    private listsStore: ListsStore,
  ) { }
  onCardCreate(newCard: Partial<Card>): void {
    this.listsStore.createCard(newCard);
  }
  onUpdateList(list: List): void {
    this.boardService.updateListCardsPosition(list);
  }
  onDrop(event: CdkDragDrop<List[]>): void {
    moveItemInArray(this._lists, event.previousIndex, event.currentIndex);
    const newLists = this._lists.map((list, i) => ({ ...list, position: i + 1 }));
    this.updateLists.emit(newLists);
  }
  onCardOpen(card: Card): void {
    this.openCard.emit(card);
  }
}
