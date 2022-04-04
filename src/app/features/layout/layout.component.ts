import { TopnavComponent } from './../topnav/topnav.component';
import { Theme } from './../../core/interface/themes';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, HostListener, ViewChild, OnDestroy, Input } from '@angular/core';
import { BehaviorSubject, map, mergeMap, Subscription } from 'rxjs';
import { ScreenSize } from 'src/app/core/interface/screen-size.enum';
import { BoardsService } from './../../core/services/boards.service';
import { WorkspaceService } from './../../core/services/workspace.service';
import { SidebarComponent } from './../sidebar/sidebar.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent implements AfterViewInit, OnDestroy {
  @Input() theme: Theme | undefined;
  @ViewChild('sidebar') sidebar!: SidebarComponent;
  @ViewChild('topnav') topnav!: TopnavComponent;
  @ViewChild('content') content!: ElementRef;
  @HostListener('window:resize') onResize() {
    this.isLargeScreen$.next(this.getIsLargeScreen());
  }
  isLargeScreen$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.getIsLargeScreen());
  subscription: Subscription = new Subscription();
  boardSubscription: Subscription = new Subscription();
  constructor(
    private elementRef: ElementRef,
    private workspaceService: WorkspaceService,
    private boardsService: BoardsService,
  ) { }
  ngAfterViewInit(): void {
    this.topnav.elementRef.nativeElement.style.backgroundColor = '#026aa7';
    this.subscription = this.isLargeScreen$.asObservable().pipe(
      mergeMap((isLargeScreen) => this.workspaceService.getCurrentWorkspace().pipe(
        map(workspace => {
          if (!workspace && !!this.sidebar && !!this.content && isLargeScreen) {
            this.sidebar.elementRef.nativeElement.style.paddingLeft = '300px';
            this.content.nativeElement.style.marginLeft = '300px';
          } else {
            this.sidebar.elementRef.nativeElement.style.paddingLeft = '0';
            this.content.nativeElement.style.marginLeft = '0';
          }
          return workspace;
        }),
      ))).subscribe();
    this.boardSubscription = this.boardsService.getCurrentBoard().pipe(
      map(board => {
        if (!!board) {
          if (!!this.sidebar) {
            this.sidebar.elementRef.nativeElement.style.backgroundColor = this.theme?.sidebarBackground;
            this.sidebar.elementRef.nativeElement.style.color = this.theme?.sidebarText;
          }
          if (!!this.content) this.content.nativeElement.style.backgroundColor = this.theme?.boardBackground;
          if (!!this.topnav) this.topnav.elementRef.nativeElement.style.backgroundColor = this.theme?.topnavBackground;
        }
      })).subscribe();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.boardSubscription.unsubscribe();
  }
  onSidebarToggle(isOpen: boolean): void {
    if (isOpen) this.elementRef.nativeElement.classList.remove('closed');
    else this.elementRef.nativeElement.classList.add('closed');
  }
  getIsLargeScreen(): boolean {
    return window.innerWidth >= ScreenSize.Large;
  }
}
