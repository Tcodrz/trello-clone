import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Location } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Icons } from '@ui-components';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { map, Observable, of, Subscription, tap } from 'rxjs';
import { Board } from 'src/app/core/interface/board.interface';
import { Card } from 'src/app/core/interface/card.interface';
import { ChecklistItem } from 'src/app/core/interface/checklist.interface';
import { ModalService } from './../../../../projects/ui-components/src/lib/modal/modal.service';
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
  @ViewChild('cover', { static: false }) cover!: ElementRef;
  card$: Observable<Card | null> = of(null);
  board$: Observable<Board | null> = of(null);
  Icons = Icons;
  workspaceID!: string;
  boardID!: string;
  subscription!: Subscription;
  cbOnClose: (() => void) | undefined;
  constructor(
    private boardService: BoardsService,
    private cardService: CardService,
    private location: Location,
    private modal: ModalService,
    private ref: DynamicDialogRef,
  ) { }
  ngAfterViewInit(): void {
    // if (this.cover)
    // this.cover.nativeElement.style.backgroundColor = 'green';
  }
  ngOnInit(): void {
    const url = this.location.path();
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
    this.subscription = this.modal.config().subscribe(modal => {
      this.cbOnClose = modal.cbOnClose;
    });
  }
  ngOnDestroy(): void {
    if (this.cbOnClose) this.cbOnClose();
    this.subscription.unsubscribe();
  }
  onChecklistAdd(name: string) { this.cardService.checklistAdd(name); }
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
  onDeleteCheckList(checklist: Checklist): void { this.cardService.checklistDelete(checklist); }
  onUpdateItem(item: ChecklistItem): void { this.cardService.updateChecklistItem(item); }
  onDeleteItem(item: ChecklistItem): void { this.cardService.deleteChecklistItem(item); }
  onUpdateChecklist(list: Checklist): void { this.cardService.updateChecklist(list); }
  onCreateCardFromItem(item: ChecklistItem): void { this.cardService.createCardFromItem(item); }
  onArchiveCard(card: Card) { this.cardService.archive(card); }
  onUndoArchive(card: Card) { this.cardService.undoArchive(card); }
  onDeleteCard(card: Card) {
    this.ref.close();
    this.cardService.deleteCard(card);
  }
  onDropChecklistItem(event: CdkDragDrop<ChecklistItem[]>, checklist: Checklist): void {
    const item: ChecklistItem = event.previousContainer.data[event.previousIndex];
    if (event.previousContainer !== event.container) // move item from list to another list
      this.cardService.transferChecklistItem(item, checklist.id, event.currentIndex);
    else  // move item in list
      this.cardService.moveChecklistItem(item, checklist, event.previousIndex, event.currentIndex);

  }
}
