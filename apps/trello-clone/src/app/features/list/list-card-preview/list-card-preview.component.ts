import { Card } from './../../../core/interface/card.interface';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-list-card-preview',
  templateUrl: './list-card-preview.component.html',
  styleUrls: ['./list-card-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListCardPreviewComponent {
  @Input() card!: Card;
  @Output() open: EventEmitter<Card> = new EventEmitter<Card>();
  openCard(): void { this.open.emit(this.card); }
}
