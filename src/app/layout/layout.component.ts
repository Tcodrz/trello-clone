import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  sidebarOpen: boolean = true;
  constructor(
    private elementRef: ElementRef,
  ) { }
  ngOnInit(): void { }
  onSidebarToggle(isOpen: boolean): void {
    this.sidebarOpen = isOpen;
    this.elementRef.nativeElement.style.gridTemplateColumns = isOpen ? '300px 1fr' : '30px calc(100% - 30px)';
  }
}
