import { ActivatedRoute } from '@angular/router';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Icons } from '@ui-components';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { map, Observable, of, tap } from 'rxjs';
import { Board } from 'src/app/core/interface/board.interface';
import { Card } from 'src/app/core/interface/card.interface';
import { ChecklistItem } from 'src/app/core/interface/checklist.interface';
import { Checklist } from './../../core/interface/checklist.interface';
import { BoardsService } from './../../core/services/boards.service';
import { CardService } from './../../core/services/card.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent implements OnInit, OnDestroy {
  @Output() close: EventEmitter<void> = new EventEmitter<void>();
  @ViewChild('cover', { static: false }) cover!: ElementRef;
  card$: Observable<Card | null> = of(null);
  board$: Observable<Board | null> = of(null);
  Icons = Icons;
  constructor(
    private activeRoute: ActivatedRoute,
    private boardService: BoardsService,
    private cardService: CardService,
    private ref: DynamicDialogRef,
  ) { }
  ngOnInit(): void {
    this.activeRoute.params.subscribe((params: any) => {
      this.board$ = this.boardService.getBoard(params.boardID);
    });
    this.card$ = this.cardService.getCurrentCard().pipe(
      tap(card => {
        if (card && card.cover && this.cover)
          this.cover.nativeElement.style.backgroundColor = card.cover;
      })
    );
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
  onAddChecklistItem(item: Partial<ChecklistItem>) {
    this.cardService.addChecklistItem(item);
  }
  onClose() {
    this.ref.close();
  }
  onDeleteChecklist(checklist: Checklist) {
    this.cardService.checklistDelete(checklist);
  }
  onItemClicked(item: ChecklistItem) {
    this.cardService.updateChecklistItem(item);
  }
}
