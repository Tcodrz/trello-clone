import { SidebarService } from './../../core/services/sidebar.service';
import { Component, ElementRef, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { BehaviorSubject, map, Observable, of, switchMap } from 'rxjs';
import { Workspace } from 'src/app/core/interface/workspace.interface';
import { ScreenSize } from '../../core/interface/screen-size.enum';
import { StateService } from '../../state/state.service';
import { Icons } from '../../ui-components/button/icon/icons';
import { MenuItem } from '../../ui-components/menu/menu/menu.component';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Output() open: EventEmitter<boolean> = new EventEmitter();
  workspaces$: Observable<Workspace[]> = of([]);
  workspace$: Observable<Workspace | null> = of(null);
  menuLinks$: Observable<MenuItem[]> = of([]);
  isSmallScreen$ = new BehaviorSubject<boolean>(false);
  showToggler$: Observable<boolean> = of(false);
  isOpen: boolean = true;
  Icons = Icons;
  @HostListener('window:resize', ['$event']) onResize(event: Event) {
    this.initSidebar(event);
  }
  constructor(
    private elementRef: ElementRef,
    private state: StateService,
    private sidebar: SidebarService,
  ) { }

  ngOnInit(): void {
    this.initSidebar();
    this.workspaces$ = this.state.getWorkspaces();
    this.workspace$ = this.state.getCurrentWorkspace();
    this.menuLinks$ = this.sidebar.getMenuLinks();
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
