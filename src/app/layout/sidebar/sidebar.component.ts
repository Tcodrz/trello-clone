import { Component, ElementRef, EventEmitter, OnInit, Output } from '@angular/core';
import { Icons } from './../icon/icon.component';

export interface Link {
  label: string;
  route: string;
  icon: Icons;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Output() toggle: EventEmitter<void> = new EventEmitter();
  Icons = Icons;
  links: Link[] = [
    {
      label: 'Boards',
      route: '/dashboard/feed',
      icon: Icons.ClipBoard
    },
    {
      label: 'Templates',
      route: '/dashboard/templates',
      icon: Icons.BorderAll
    },
    {
      label: 'Home',
      route: '/dashboard/home',
      icon: Icons.Home
    }
  ];
  constructor(
    private elementRef: ElementRef,
  ) { }

  ngOnInit(): void {
  }
  onToggle() {
    this.toggle.emit();
  }

}
