import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Icons } from '@ui-components';
import { Checklist, ChecklistItem } from './../../core/interface/checklist.interface';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChecklistComponent implements OnInit {
  @Input() checklist!: Checklist;
  @Input() progress: number | null = null;
  @Output() addItem: EventEmitter<ChecklistItem> = new EventEmitter<ChecklistItem>();
  @Output() delete: EventEmitter<Checklist> = new EventEmitter<Checklist>();
  Icons = Icons;
  progressStyles = {
    backgroundColor: '#091e4214',
    height: '8px',
    borderRadius: '4px',
  };
  createMode = false;
  constructor() { }
  ngOnInit(): void {
  }
  onAddItem() {
    this.createMode = true;
  }
  onSubmitItem(item: string) {
    const checklistItem: ChecklistItem = {
      title: item,
      checklistID: this.checklist.id,
      completed: false,
    };
    this.addItem.emit(checklistItem);
    this.createMode = false;
  }
  onDeleteChecklist(checklist: Checklist) {
    this.delete.emit(checklist);
  }
}
