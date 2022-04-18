import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Card } from 'src/app/core/interface/card.interface';

@Component({
  selector: 'app-list-card-preview',
  templateUrl: './list-card-preview.component.html',
  styleUrls: ['./list-card-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListCardPreviewComponent implements OnInit {
  @Input() card!: Card;
  @Output() open: EventEmitter<Card> = new EventEmitter<Card>();
  constructor() { }
  ngOnInit(): void { }
  openCard(): void { this.open.emit(this.card); }
}
