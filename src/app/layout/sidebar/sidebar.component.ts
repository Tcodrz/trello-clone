import { Component, ElementRef, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { map, Observable, of, BehaviorSubject } from 'rxjs';
import { Link } from 'src/app/core/interface/link.interface';
import { Workspace, WorkspaceState } from 'src/app/state/workspaces/workspaces.reducer';
import { ScreenSize } from './../../core/interface/screen-size.enum';
import { StoreService } from './../../state/state.service';
import { Icons } from './../icon/icon.component';
import { MenuItem } from './../menu/menu.component';
import { dashboardSidebarLinks, workspaceMenuItems } from './menus';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Output() open: EventEmitter<boolean> = new EventEmitter();
  workspaces$: Observable<Workspace[]> = of([]);
  inWorkspace$: Observable<boolean> = of(false);
  showToggler$ = new BehaviorSubject<boolean>(false);
  isOpen: boolean = true;
  Icons = Icons;
  links: Link[] = dashboardSidebarLinks;
  workspaceMenuItems: MenuItem[] = workspaceMenuItems;
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) { this.initSidebar(event); }
  constructor(
    private elementRef: ElementRef,
    private store: StoreService,
  ) { }

  ngOnInit(): void {
    this.initSidebar();
    this.workspaces$ = this.store.select('workspaceState').pipe(
      map((state) => (state as WorkspaceState).allWorkspaces));
    this.inWorkspace$ = this.store.select('workspaceState').pipe(
      map((state) => !!(state as WorkspaceState).currentWorkSpace));
  }
  initSidebar(event?: Event) {
    const width = (event?.target as Window)?.innerWidth || window.innerWidth;
    const isSmallScreen = width <= ScreenSize.Small;
    if (isSmallScreen) {
      this.showToggler$.next(true);
      this.hide();
    } else {
      this.showToggler$.next(false);
      this.show();
    }
  }
  onToggle() {
    if (this.isOpen) this.hide();
    else this.show();
  }
  private hide() {
    this.elementRef.nativeElement.classList.add('closed');
    this.isOpen = false;
    this.open.emit(this.isOpen);
  }
  private show() {
    this.elementRef.nativeElement.classList.remove('closed');
    this.isOpen = true;
    this.open.emit(this.isOpen);
  }

}
