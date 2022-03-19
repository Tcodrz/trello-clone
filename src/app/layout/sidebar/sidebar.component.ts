import { Component, ElementRef, EventEmitter, OnInit, Output } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Workspace, WorkspaceState } from 'src/app/state/workspaces/workspaces.reducer';
import { StoreService } from './../../state/state.service';
import { Icons } from './../icon/icon.component';
import { MenuItem } from './../menu/menu.component';
import { dashboardSidebarLinks, workspaceMenuItems } from './menus';

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
  showToggler$: Observable<boolean> = of(false);
  isOpen: boolean = true;
  Icons = Icons;
  links: Link[] = dashboardSidebarLinks;
  workspaceMenuItems: MenuItem[] = workspaceMenuItems;
  constructor(
    private elementRef: ElementRef,
    private store: StoreService,
  ) { }

  ngOnInit(): void {
    this.workspaces$ = this.store.select('workspaceState').pipe(
      map((state) => (state as WorkspaceState).allWorkspaces));
    this.showToggler$ = this.store.select('workspaceState').pipe(
      map((state) => !!(state as WorkspaceState).currentWorkSpace));
  }
  onToggle() {
    this.elementRef.nativeElement.classList.toggle('closed');
    this.isOpen = !this.isOpen;
    this.open.emit(this.isOpen);
  }

}
