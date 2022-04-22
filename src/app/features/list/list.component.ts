import { ListsService } from './../../core/services/lists.service';
import { Observable, of } from 'rxjs';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Icons } from '@ui-components';
import { List } from 'src/app/core/interface/list.interface';
import { Card } from './../../core/interface/card.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent implements OnInit {
  @Input() set list(list: List) {
    this.list$ = this.listsService.populateCards(list);
  };
  @Output() createCard: EventEmitter<Partial<Card>> = new EventEmitter();
  @Output() updateList: EventEmitter<List> = new EventEmitter();
  @Output() openCard: EventEmitter<Card> = new EventEmitter<Card>();
  list$: Observable<List | null> = of(null);
  Icons = Icons;
  createMode: boolean = false;
  newCardName: FormControl = new FormControl('');
  constructor(
    private listsService: ListsService
  ) { }
  ngOnInit(): void { }
  onAddCard() { this.createMode = true; }
  onCancel() { this.createMode = false; }
  onSubmit(list: List) {
    const card: Partial<Card> = {
      listID: list.id,
      name: this.newCardName.value,
      position: list.cards.length,
    };
    this.createCard.emit(card);
    this.createMode = false;
  }
  onDrop(event: CdkDragDrop<Card[]>, list: List) {
    moveItemInArray(list.cards, event.previousIndex, event.currentIndex);
    const newList = {
      ...list,
      cards: list.cards.map((card, i) => ({ ...card, position: i + 1 }))
    };
    this.updateList.emit(newList);
  }
  onCardOpen(card: Card) {
    this.openCard.emit(card);
  }
}
