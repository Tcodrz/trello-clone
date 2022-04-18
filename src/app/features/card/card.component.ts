import { GotoService } from './../../core/services/goto.service';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
export class CardComponent implements OnInit, OnDestroy, AfterViewInit {
  @Output() close: EventEmitter<void> = new EventEmitter<void>();
  @ViewChild('cover', { static: false }) cover!: ElementRef;
  card$: Observable<Card | null> = of(null);
  board$: Observable<Board | null> = of(null);
  Icons = Icons;
  workspaceID!: string;
  boardID!: string;
  constructor(
    private router: Router,
    private goto: GotoService,
    private boardService: BoardsService,
    private cardService: CardService,
    private ref: DynamicDialogRef,
  ) { }
  ngAfterViewInit(): void {
    // if (this.cover)
    // this.cover.nativeElement.style.backgroundColor = 'green';
  }
  ngOnInit(): void {
    const url = this.router.url;
    const parts = url.split(';');
    this.workspaceID = parts[1].split('=')[1];
    this.boardID = parts[2].split('=')[1];
    const cardID = parts[3].split('=')[1];
    if (!this.boardID || !cardID) debugger;
    this.board$ = this.boardService.getBoard(this.boardID);
    this.card$ = this.cardService.getCard(cardID).pipe(
      tap(card => {
        if (card && card.cover && this.cover)
          this.cover.nativeElement.style.backgroundColor = card.cover;
      })
    );
  }
  ngOnDestroy(): void {
    this.goto.board(this.boardID, this.workspaceID); // clear card id from route
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
  onAddChecklistItem(item: Partial<ChecklistItem>) { this.cardService.addChecklistItem(item); }
  onClose(): void { this.ref.close(); }
  onDeleteChecklist(checklist: Checklist): void {
    this.cardService.checklistDelete(checklist);
  }
  onItemCompleted(item: ChecklistItem): void {
    this.cardService.updateChecklistItem(item);
  }
}
