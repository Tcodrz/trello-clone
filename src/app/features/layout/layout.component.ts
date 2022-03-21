import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  constructor(
    private elementRef: ElementRef,
  ) { }
  ngOnInit(): void { }
  onSidebarToggle(isOpen: boolean): void {
    if (isOpen) this.elementRef.nativeElement.classList.remove('closed');
    else this.elementRef.nativeElement.classList.add('closed');
  }
}
