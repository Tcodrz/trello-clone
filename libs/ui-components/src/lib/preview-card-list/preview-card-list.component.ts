import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PreviewItem } from "@trello-clone/trello-interface";


@Component({
  selector: 'ui-preview-card-list',
  templateUrl: './preview-card-list.component.html',
  styleUrls: ['./preview-card-list.component.scss'],
})
export class PreviewCardListComponent {
  @Input() items: PreviewItem[] | null = [];
  @Input() showFirstCard: boolean = false;
  @Input() showLastCard: boolean = false;
  @Input() firstCardTitle: string = '';
  @Input() lastCardTitle: string = '';
  @Output() firstCardClick: EventEmitter<Event> = new EventEmitter<Event>();
  @Output() lastCardClick: EventEmitter<Event> = new EventEmitter<Event>();
}
