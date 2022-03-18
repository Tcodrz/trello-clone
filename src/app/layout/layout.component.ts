import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { SidebarComponent } from './sidebar/sidebar.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  @ViewChild('sidebar') sidebar?: TemplateRef<SidebarComponent>;
  constructor() { }

  ngOnInit(): void {
  }
  onSidebarToggle() {
    this.sidebar?.elementRef.nativeElement.classList.toggle('closed');
  }

}
