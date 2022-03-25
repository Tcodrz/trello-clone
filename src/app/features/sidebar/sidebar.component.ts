import { Component, ElementRef, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { BehaviorSubject, map, Observable, of, switchMap } from 'rxjs';
import { Link } from 'src/app/core/interface/link.interface';
import { Workspace } from 'src/app/core/interface/workspace.interface';
import { ScreenSize } from '../../core/interface/screen-size.enum';
import { StateService } from '../../state/state.service';
import { Icons } from '../../ui-components/button/icon/icon.component';
import { MenuItem } from '../../ui-components/menu/menu/menu.component';
import { dashboardSidebarLinks, workspaceMenuItems } from './menus';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Output() open: EventEmitter<boolean> = new EventEmitter();
  workspaces$: Observable<Workspace[]> = of([]);
  isSmallScreen$ = new BehaviorSubject<boolean>(false);
  isOpen: boolean = true;
  Icons = Icons;
  links: Link[] = dashboardSidebarLinks;
  workspaceMenuItems: MenuItem[] = workspaceMenuItems;
  showToggler$: Observable<boolean> = of(false);
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) { this.initSidebar(event); }
  workspace$: Observable<Workspace | null> = of(null);
  constructor(
    private elementRef: ElementRef,
    private state: StateService,
  ) { }

  ngOnInit(): void {
    this.initSidebar();
    this.workspaces$ = this.state.getWorkspaces();
    this.workspace$ = this.state.getCurrentWorkspace();
    this.showToggler$ = this.isSmallScreen$.pipe(
      switchMap(isSmallScreen =>
        this.workspace$.pipe(map(workspace => {
          if (isSmallScreen) return true;
          else return !!workspace;
        }))
      ));
  }
  initSidebar(event?: Event) {
    const width = (event?.target as Window)?.innerWidth || window.innerWidth;
    const isSmallScreen = width <= ScreenSize.Small;
    this.isSmallScreen$.next(isSmallScreen);
    if (isSmallScreen) this.hide();
    else this.show();
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
