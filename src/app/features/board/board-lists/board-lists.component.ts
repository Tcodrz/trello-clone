import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { List } from 'src/app/core/interface/list.interface';
import { Icons } from 'src/app/ui-components/button/icon/icons';
import { Card } from './../../../core/interface/card.interface';
import { CardService } from './../../../core/services/card.service';

@Component({
  selector: 'app-board-lists',
  templateUrl: './board-lists.component.html',
  styleUrls: ['./board-lists.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardListsComponent implements OnInit {
  startX: number = 0;
  @Input() set lists(lists: List[] | undefined) {
    if (!!lists) this._lists = lists;
  };
  @Output() updateLists: EventEmitter<List[]> = new EventEmitter();
  _lists: List[] = [];
  Icons = Icons;
  constructor(
    private cardService: CardService,
  ) { }

  ngOnInit(): void {
  }
  onCardCreate(newCard: Partial<Card>) {
    console.log(newCard);
    this.cardService.createCard(newCard);
  }
  onUpdateList(list: List) {
    this.cardService.updateCardsPosition(list.cards);
  }
  onDrop(event: CdkDragDrop<List[]>) {
    moveItemInArray(this._lists, event.previousIndex, event.currentIndex);
    const newLists = this._lists.map((list, i) => ({ ...list, position: i + 1 }));
    this.updateLists.emit(newLists);
  }
}
