import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {Board, Card} from '@trello-clone/trello-interface';
import {Icons} from '@ui-components';

@Component({
  selector: 'app-card-side-menu',
  templateUrl: './card-side-menu.component.html',
  styleUrls: ['./card-side-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardSideMenuComponent {
  @Input() board: Board | null = null;
  @Input() card: Card | null = null;
  @Output() addChecklist: EventEmitter<string> = new EventEmitter<string>();
  @Output() archiveCard: EventEmitter<Card> = new EventEmitter<Card>();
  @Output() undoArchiveCard: EventEmitter<Card> = new EventEmitter<Card>();
  @Output() deleteCard: EventEmitter<Card> = new EventEmitter<Card>();
  Icons = Icons;
  onCheklistAdd(name: string) {
    this.addChecklist.emit(name);
  }
  onArchiveCard() { if (this.card) this.archiveCard.emit(this.card); }
  onDeleteCard() { if (this.card) this.deleteCard.emit(this.card); }
  onUndoArchive() { if (this.card) this.undoArchiveCard.emit(this.card); }
}
