import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[clickOutside]'
})
export class ClickOutsideDirective {
  @Output() clickOutside: EventEmitter<void> = new EventEmitter<void>();
  @HostListener('document:click') onClickOutside() {
    if (!this.inside) this.clickOutside.emit();
    this.inside = false;
  }
  @HostListener('click') onClickInside() {
    this.inside = true;
  }
  inside: boolean = false;
  constructor() { }

}
