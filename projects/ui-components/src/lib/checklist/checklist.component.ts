import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Checklist, ChecklistItem } from './../../../../../src/app/core/interface/checklist.interface';
import { Icons } from './../button/icon/icons';

@Component({
  selector: 'ui-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FormBuilder]
})
export class ChecklistComponent implements OnInit {
  @Input() checklist: Checklist | undefined;
  @Output() addItem: EventEmitter<Partial<ChecklistItem>> = new EventEmitter<Partial<ChecklistItem>>();
  @Output() updateItem: EventEmitter<ChecklistItem> = new EventEmitter<ChecklistItem>();
  @Output() deleteChecklist: EventEmitter<Checklist> = new EventEmitter<Checklist>();
  @Output() updateChecklist: EventEmitter<Checklist> = new EventEmitter<Checklist>();
  @ViewChild('addItemInput', { static: false }) addItemInput!: ElementRef;
  progress$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  form!: FormGroup;
  Icons = Icons;
  createMode: boolean = false;
  selectedItemID!: string;
  constructor(
    private fb: FormBuilder,
  ) { }
  ngOnInit(): void {
    this.form = this.fb.group({
      newItem: this.fb.control(''),
    });
    if (this.checklist) {
      this.checklist.items.sort((a, b) => a.position - b.position);
      this.calcProgress(this.checklist);
    }
  }
  calcProgress(checklist: Checklist): void {
    const N = checklist.items.length;
    if (N === 0) {
      this.progress$.next(0);
      return;
    }
    const completed = checklist.items.filter(i => i.completed).length;
    const progress = Math.round(completed * 100 / N);
    this.progress$.next(progress);
  }
  onAddItem(): void {
    if (!this.checklist) return;
    const title = this.form.value.newItem;
    const item = {
      title: title,
      checklistID: this.checklist.id,
      completed: false,
      position: this.checklist.items.length
    } as ChecklistItem;
    this.addItem.emit(item);
  }
  onUpdateItem(item: ChecklistItem): void { this.updateItem.emit(item); }
  onDeleteChecklist(): void { this.deleteChecklist.emit(this.checklist); }
  toggleCreateMode(): void {
    this.createMode = !this.createMode;
    if (this.createMode) {
      setTimeout(() => { // wait for addItemInput to be instantiated
        const input = this.addItemInput.nativeElement;
        input.focus();
        input.select();
      });
    }
  }
  onItemSelected(item: ChecklistItem): void { this.selectedItemID = item.id; }
  onItemUnselect(): void { this.selectedItemID = ''; }
  resetSelectedList() { this.selectedItemID = ''; }
  onDrop(event: CdkDragDrop<ChecklistItem[]>) {
    if (!this.checklist) return;
    moveItemInArray(this.checklist.items, event.previousIndex, event.currentIndex);
    this.checklist.items.forEach((item, i) => item.position = i + 1);
    this.updateChecklist.emit(this.checklist);
  }
}
