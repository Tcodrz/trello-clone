import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, of, map } from 'rxjs';
import { Board } from 'src/app/core/interface/board.interface';
import { Card } from 'src/app/core/interface/card.interface';
import { ChecklistItem } from 'src/app/core/interface/checklist.interface';
import { BoardsService } from './../../core/services/boards.service';
import { CardService } from './../../core/services/card.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent implements OnInit, OnDestroy {
  card$: Observable<Card | null> = of(null);
  board$: Observable<Board | null> = of(null);

  constructor(
    private boardService: BoardsService,
    private cardService: CardService,
  ) { }
  ngOnInit(): void {
    this.card$ = this.cardService.getCurrentCard();
    this.board$ = this.boardService.getCurrentBoard();
  }
  ngOnDestroy(): void {
    this.cardService.setCurrentCard(null);
  }
  onChecklistAdd(name: string) {
    this.cardService.addChecklist(name);
  }
  getChecklistProgress(checklistID: string): Observable<number> {
    return this.card$.pipe(
      map(card => {
        const list = card?.checklists.find(list => list.id === checklistID);
        if (list) {
          const completed = list.items.filter(i => i.completed).length;
          const totalItems = list.items.length;
          if (!completed || !totalItems) return 0;
          return Math.round(completed * 100 / totalItems);
        }
        return 0;
      })
    )
  }
  onAddChecklistItem(item: ChecklistItem) {
    this.cardService.addChecklistItem(item);
  }

}
