import { AfterContentChecked, ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DropdownOption } from '../../../../../src/app/core/interface/dropdown-option.interface';
import { Icons } from '../button/icon/icons';

@Component({
  selector: 'ui-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: SelectComponent
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectComponent implements ControlValueAccessor, AfterContentChecked {
  @Input() label: string = '';
  @Input() options: DropdownOption[] = [];
  @ViewChild('dropdown') dropdown!: ElementRef;
  @ViewChild('input') input!: ElementRef;
  @ViewChild('inputElement') inputElement!: ElementRef;
  selected!: DropdownOption;
  Icons = Icons;
  touched = false;
  disabled = false;
  onChange = (value: DropdownOption) => { };
  onTouched = () => { };
  constructor() { }
  ngAfterContentChecked(): void {
    if (!!this.dropdown && !!this.input) {
      const width = this.input.nativeElement.offsetWidth;
      this.dropdown.nativeElement.style.width = `${width - 4}px`;
    }
  }
  writeValue(value: DropdownOption): void {
    this.selected = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  onSelect(option: DropdownOption) {
    this.markAsTouched();
    this.selected = option;
    this.onToggle();
    this.onChange(option);
  }
  onToggle() {
    this.dropdown.nativeElement.classList.toggle('open');
    this.input.nativeElement.classList.toggle('open');
  }
  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }
  onInput() {
    this.inputElement.nativeElement.value = this.selected.name;
  }
}
