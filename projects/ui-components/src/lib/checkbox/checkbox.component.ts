import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'ui-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: CheckboxComponent
    }
  ]
})
export class CheckboxComponent implements OnInit, ControlValueAccessor {
  checked: boolean = false;
  faCheck = faCheck;
  constructor() { }
  ngOnInit(): void { }
  onChange = (value: boolean) => {
    this.checked = value;
  };
  onTouch = () => { };
  writeValue(value: boolean): void {
    this.checked = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  onToggle() {
    this.checked = !this.checked;
    this.onChange(this.checked);
  }
}
