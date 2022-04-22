import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { ChecklistItem } from 'src/app/core/interface/checklist.interface';
import { Icons } from './../../button/icon/icons';

@Component({
  selector: 'ui-checklist-item',
  templateUrl: './checklist-item.component.html',
  styleUrls: ['./checklist-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChecklistItemComponent implements OnInit {
  @Input() item: ChecklistItem | null = null;
  @Input() set selectedItemID(selectedItemID: string) {
    this.editMode = !!this.item && selectedItemID === this.item.id;
    if (this.editMode) {
      setTimeout(() => {
        const input = this.titleInput.nativeElement as HTMLInputElement;
        input.focus();
        input.select();
      });
    }
  };
  @Output() updateItem: EventEmitter<ChecklistItem> = new EventEmitter<ChecklistItem>();
  @Output() selectItem: EventEmitter<ChecklistItem> = new EventEmitter<ChecklistItem>();
  @Output() unselectItem: EventEmitter<void> = new EventEmitter<void>();
  @ViewChild('titleInput', { static: false }) titleInput!: ElementRef;
  form!: FormGroup;
  editMode: boolean = false;
  Icons = Icons;
  constructor(private fb: FormBuilder) { }
  ngOnInit(): void {
    this.form = this.fb.group({
      title: this.fb.control(this.item?.title),
      completed: this.fb.control(this.item?.completed),
    });
    this.form.get('completed')?.valueChanges.pipe(
      debounceTime(200)
    ).subscribe(value => {
      if (this.item)
        this.updateItem.emit({
          ...this.item,
          completed: value
        });
    });
  }
  onItemClick() {
    if (!this.item) return;
    this.selectItem.emit(this.item);
  }
  onSaveItem() {
    if (!this.item) return;
    const nextTitle = this.form.get('title')?.value ?? this.item.title;
    this.updateItem.emit({ ...this.item, title: nextTitle });
    this.unselectItem.emit();
  }
}
