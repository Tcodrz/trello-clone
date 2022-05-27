import {Icons, MenuItems, UiInputComponent} from '@ui-components';
import {ChecklistItem} from '@trello-clone/trello-interface';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {debounceTime} from 'rxjs';

@Component({
  selector: 'ui-checklist-item',
  templateUrl: './checklist-item.component.html',
  styleUrls: ['./checklist-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChecklistItemComponent implements OnInit {
  @ViewChild('titleInput', { static: false }) titleInput!: UiInputComponent;
  @Input() item: ChecklistItem | null = null;
  @Output() updateItem: EventEmitter<ChecklistItem> = new EventEmitter<ChecklistItem>();
  @Output() deleteItem: EventEmitter<ChecklistItem> = new EventEmitter<ChecklistItem>();
  @Output() createCardFromItem: EventEmitter<ChecklistItem> = new EventEmitter<ChecklistItem>();
  @HostListener('keypress', ['$event'])
  onEnter(event: any) {
    if (event.key === 'Enter') this.onSaveItem();
  }
  @HostListener('mouseenter')
  onMouseEnter() { this.showMenuIcon = true; }
  @HostListener('mouseleave')
  onMouseLeave() { this.showMenuIcon = false; }
  form!: FormGroup;
  Icons = Icons;
  itemMenu: MenuItems[] = [];
  showMenuIcon: boolean = false;
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
    this.initItemMenu();
  }
  initItemMenu() {
    this.itemMenu = [
      {
        headline: '',
        items: [
          {
            label: 'Convert to card',
            command: () => {
              if (this.item) this.createCardFromItem.emit(this.item);
            },
          },
          {
            label: 'Delete',
            command: () => {
              if (this.item) this.deleteItem.emit(this.item);
            }
          }
        ]
      }
    ];
  }
  onSaveItem() {
    if (!this.item) return;
    const nextTitle = this.form.get('title')?.value ?? this.item.title;
    this.updateItem.emit({ ...this.item, title: nextTitle });
    this.toggleEditMode(false);
  }
  onItemClick() {
    this.toggleEditMode(true);
    setTimeout(() => { // wait for titlInput to be rendered
      this.titleInput.focus();
      this.titleInput.select()
    });
  }
  toggleEditMode(onEditMode: boolean) {
    if (this.item) this.item.onEditMode = onEditMode;
  }
}
