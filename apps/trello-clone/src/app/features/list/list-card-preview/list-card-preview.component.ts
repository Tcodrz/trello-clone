import { Card } from '@trello-clone/trello-interface';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-list-card-preview',
  templateUrl: './list-card-preview.component.html',
  styleUrls: ['./list-card-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListCardPreviewComponent {
  @Input() card!: Card;
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() open: EventEmitter<Card> = new EventEmitter<Card>();
  openCard(): void { this.open.emit(this.card); }
}
