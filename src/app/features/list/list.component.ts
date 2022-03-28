import { Card } from './../../core/interface/card.interface';
import { Icons } from 'src/app/ui-components/button/icon/icons';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { List } from 'src/app/core/interface/list.interface';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @Input() list!: List;
  @Output() createCard: EventEmitter<Partial<Card>> = new EventEmitter();
  Icons = Icons;
  createMode: boolean = false;
  newCardName: FormControl = new FormControl('');
  constructor() { }
  ngOnInit(): void {
  }
  onAddCard() { this.createMode = true; }
  onCancel() { this.createMode = false; }
  onSubmit() {
    const card: Partial<Card> = {
      listID: this.list.id,
      name: this.newCardName.value,
      position: this.list.cards.length,
    };
    this.createCard.emit(card);
    this.createMode = false;
  }
}
