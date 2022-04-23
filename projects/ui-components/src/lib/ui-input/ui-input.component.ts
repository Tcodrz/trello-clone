import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
@Component({
  selector: 'ui-input',
  templateUrl: './ui-input.component.html',
  styleUrls: ['./ui-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: UiInputComponent
    }
  ]
})
export class UiInputComponent implements OnInit, ControlValueAccessor {
  @ViewChild('input') input!: ElementRef;
  @Output() submit: EventEmitter<void> = new EventEmitter<void>();
  value: any;
  constructor() { }
  ngOnInit(): void { }
  onChange = (value: any) => { this.value = value; }
  onTouch = () => { }
  writeValue(obj: any): void { this.value = obj; }
  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouch = fn; }
  focus(): void {
    if (this.input) (this.input.nativeElement as HTMLTextAreaElement).focus();
  }
  select(): void {
    if (this.input) (this.input.nativeElement as HTMLTextAreaElement).select();
  }

}
