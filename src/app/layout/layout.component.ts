import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  @ViewChild('content', { static: true }) content?: ElementRef;
  constructor() { }

  ngOnInit(): void {
  }

  onSidebarToggle(isOpen: boolean): void {
    if (!this.content) return;
    if (isOpen)
      this.content.nativeElement.style.transform = 'translate3d(0%, 0, 0)';
    else
      this.content.nativeElement.style.transform = 'translate3d(-28%, 0 , 0)';
  }
}
