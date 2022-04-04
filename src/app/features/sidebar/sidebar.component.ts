import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, HostListener, OnDestroy, OnInit, Output } from '@angular/core';
import { BehaviorSubject, map, Observable, of, Subscription, switchMap, tap } from 'rxjs';
import { Workspace } from 'src/app/core/interface/workspace.interface';
import { ScreenSize } from '../../core/interface/screen-size.enum';
import { Icons } from '../../ui-components/button/icon/icons';
import { MenuItem } from '../../ui-components/menu/menu/menu.component';
import { Board } from './../../core/interface/board.interface';
import { BoardsService } from './../../core/services/boards.service';
import { SidebarService } from './../../core/services/sidebar.service';
import { WorkspaceService } from './../../core/services/workspace.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent implements OnInit, OnDestroy {
  @Output() open: EventEmitter<boolean> = new EventEmitter();
  workspaces$: Observable<Workspace[]> = of([]);
  workspace$: Observable<Workspace | null> = of(null);
  boards$: Observable<Board[]> = of([]);
  menuLinks$: Observable<MenuItem[]> = of([]);
  isSmallScreen$ = new BehaviorSubject<boolean>(false);
  showToggler$: Observable<boolean> = of(false);
  isOpen: boolean = true;
  Icons = Icons;
  sidebarLinksStyle = {};
  userSubscription: Subscription = new Subscription();
  board$: Observable<Board | null> = of(null);
  @HostListener('window:resize', ['$event']) onResize(event: Event) {
    this.initSidebar(event);
  }
  constructor(
    private boardsService: BoardsService,
    public elementRef: ElementRef,
    private sidebarSercvice: SidebarService,
    private workspaceService: WorkspaceService,
  ) { }

  ngOnInit(): void {
    this.initSidebar();
    this.workspaceService.init();
    this.workspaces$ = this.workspaceService.getAll();
    this.workspace$ = this.workspaceService.getCurrentWorkspace().pipe(tap(workspace => {
      this.sidebarLinksStyle = !!workspace ? {} : { 'display': 'block', 'margin-top': '30px' };
    }));
    this.board$ = this.boardsService.getCurrentBoard();
    this.boards$ = this.boardsService.getBoards().pipe(
      map(boards => boards.sort((a, b) => b.updatedAt - a.updatedAt)));
    this.menuLinks$ = this.sidebarSercvice.getMenuLinks();
    this.showToggler$ = this.isSmallScreen$.pipe(
      switchMap(isSmallScreen =>
        this.workspace$.pipe(map(workspace => {
          if (isSmallScreen) return true;
          else return !!workspace;
        }))
      ));
  }
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
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
