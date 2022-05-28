import {Icons, MenuItem} from '@ui-components';
import {Board, ScreenSize, Theme, Workspace} from '@trello-clone/trello-interface';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  Renderer2
} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {BehaviorSubject, map, Observable, of, switchMap, tap} from 'rxjs';
import {BoardsService} from '../../core/services/boards.service';
import {GotoService} from '../../core/services/goto.service';
import {SidebarService} from '../../core/services/sidebar.service';
import {WorkspaceService} from '../../core/services/workspace.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent implements OnInit, OnChanges {
  @Input() theme: Theme | undefined;
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() open: EventEmitter<boolean> = new EventEmitter<boolean>();
  workspaces$: Observable<Workspace[]> = of([]);
  workspace$: Observable<Workspace | null> = of(null);
  boards$: Observable<Board[]> = of([]);
  menuLinks$: Observable<MenuItem[]> = of([]);
  isSmallScreen$ = new BehaviorSubject<boolean>(false);
  showToggler$: Observable<boolean> = of(false);
  isOpen = true;
  Icons = Icons;
  sidebarLinksStyle = {};
  board$: Observable<Board | null> = of(null);

  @HostListener('window:resize', ['$event']) onResize(event: Event) {
    this.initSidebar(event);
  }

  constructor(
    private activeRoute: ActivatedRoute,
    private boardsService: BoardsService,
    private goto: GotoService,
    private renderer: Renderer2,
    private sidebarSercvice: SidebarService,
    private workspaceService: WorkspaceService,
    public elementRef: ElementRef,
  ) {
  }

  ngOnChanges(): void {
    this.updateTheme();
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params: Params) => {
      this.initSidebar();
      this.workspaces$ = this.workspaceService.getAll();
      const workspaceID = params['workspaceID']; // workspaceID can be undefined
      const boardID = params['boardID']; // boardID can be undefined
      if (workspaceID) {
        this.initWorkspace(workspaceID);
      }
      if (boardID) {
        this.board$ = this.boardsService.getBoard(boardID);
      }
      this.menuLinks$ = this.sidebarSercvice.getMenuLinks();

    });
    this.showToggler$ = this.isSmallScreen$
      .pipe(
        switchMap(isSmallScreen => this.workspace$
          .pipe(
            map(workspace =>
              isSmallScreen ? isSmallScreen : !!workspace)
          )
        )
      );
  }

  updateTheme(): void {
    const elements = this.elementRef.nativeElement.querySelectorAll('.sidebar-link');
    elements.forEach((element: HTMLAnchorElement) => {
      this.renderer.setStyle(element, 'color', this.theme?.sidebarText);
    });
  }

  initSidebar(event?: Event): void {
    const width = (event?.target as Window)?.innerWidth || window.innerWidth;
    const isSmallScreen = width <= ScreenSize.Small;
    this.isSmallScreen$.next(isSmallScreen);
    if (isSmallScreen) this.hide();
    else this.show();
  }

  initWorkspace(workspaceID: string): void {
    this.workspace$ = this.workspaceService.getWorkspace(workspaceID).pipe(tap(workspace => {
      this.sidebarLinksStyle = workspace ? {} : {'display': 'block', 'margin-top': '30px'};
    }));
    this.boards$ = this.boardsService.getBoards(workspaceID).pipe(
      map(boards => boards.sort((a, b) => b.updatedAt - a.updatedAt)));
  }

  onToggle(): void {
    if (this.isOpen) this.hide();
    else this.show();
  }

  private hide(): void {
    this.elementRef.nativeElement.classList.add('closed');
    this.isOpen = false;
    this.open.emit(this.isOpen);
  }

  private show(): void {
    this.elementRef.nativeElement.classList.remove('closed');
    this.isOpen = true;
    this.open.emit(this.isOpen);
  }

  onBoardClick(board: Board): void {
    this.goto.board(board.id, board.workspaceID);
  }
}
