import { MenuItem } from './../menu/menu.component';
import { Observable, of, map } from 'rxjs';
import { StoreService } from './../../state/state.service';
import { Component, ElementRef, EventEmitter, OnInit, Output } from '@angular/core';
import { Icons } from './../icon/icon.component';
import { Workspace, WorkspaceState } from 'src/app/state/workspaces/workspaces.reducer';

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
  workspaces$: Observable<Workspace[]> = of([]);
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
  }

}
