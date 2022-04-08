import { BoardsService } from './../../../core/services/boards.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { List } from 'src/app/core/interface/list.interface';
import { Card } from './../../../core/interface/card.interface';
import { Icons, MenuItems } from '@ui-components';

@Component({
  selector: 'app-board-lists',
  templateUrl: './board-lists.component.html',
  styleUrls: ['./board-lists.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardListsComponent implements OnInit {
  @Input() set lists(lists: List[] | undefined) {
    if (!!lists) this._lists = lists;
  };
  @Output() updateLists: EventEmitter<List[]> = new EventEmitter();
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
  ) { }

  ngOnInit(): void {
  }
  onCardCreate(newCard: Partial<Card>) {
    console.log(newCard);
    this.boardService.createCard(newCard);
  }
  onUpdateList(list: List) {
    this.boardService.updateListCardsPosition(list);
  }
  onDrop(event: CdkDragDrop<List[]>) {
    moveItemInArray(this._lists, event.previousIndex, event.currentIndex);
    const newLists = this._lists.map((list, i) => ({ ...list, position: i + 1 }));
    this.updateLists.emit(newLists);
  }
}
