import { Component, ElementRef, EventEmitter, OnInit, Output } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Workspace, WorkspaceState } from 'src/app/state/workspaces/workspaces.reducer';
import { StoreService } from './../../state/state.service';
import { Icons } from './../icon/icon.component';
import { MenuItem } from './../menu/menu.component';

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
  @Output() open: EventEmitter<boolean> = new EventEmitter();
  workspaces$: Observable<Workspace[]> = of([]);
  isOpen: boolean = true;
  Icons = Icons;
  links: Link[] = [
    {
      label: 'Boards',
      route: '/dashboard/boards',
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
  workspaceMenuItems: MenuItem[] = [
    {
      label: 'Boards',
      icon: Icons.ClipBoard
    },
    {
      label: 'Highlights',
      icon: Icons.Heart,
    },
    {
      label: 'Views',
      icon: Icons.BorderAll,
    },
    {
      label: 'Members',
      icon: Icons.Users
    },
    {
      label: 'settings',
      icon: Icons.Settings,
    }
  ]
  constructor(
    private elementRef: ElementRef,
    private store: StoreService,
  ) { }

  ngOnInit(): void {
    this.workspaces$ = this.store.select('workspaceState').pipe(
      map((state) => (state as WorkspaceState).allWorkspaces));
  }
  onToggle() {
    this.elementRef.nativeElement.classList.toggle('closed');
    this.isOpen = !this.isOpen;
    this.open.emit(this.isOpen);
  }

}
