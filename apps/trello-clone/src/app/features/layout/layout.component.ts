import {AppColors, Board, ScreenSize} from '@trello-clone/trello-interface';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  ViewChild
} from '@angular/core';
import {BehaviorSubject, Subject, takeUntil, tap} from 'rxjs';
import {SidebarComponent} from '../sidebar/sidebar.component';
import {TopnavComponent} from '../topnav/topnav.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() board: Board | undefined;
  @ViewChild('sidebar') sidebar!: SidebarComponent;
  @ViewChild('topnav') topnav!: TopnavComponent;
  @ViewChild('content') content!: ElementRef;
  private isLargeScreen$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.getIsLargeScreen());
  private hasChanges = false;
  private destroyed$: Subject<null> = new Subject<null>();

  @HostListener('window:resize') onResize() {
    this.isLargeScreen$.next(this.getIsLargeScreen());
  }

  constructor(
    private elementRef: ElementRef,
  ) { }

  ngOnChanges(): void {
    this.hasChanges = true;
  }

  ngAfterViewInit(): void {
    this.topnav.setColor(AppColors.Blue);
    this.initLayout();
    if (this.hasChanges) {
      this.setBoardTheme(this.board);
      this.hasChanges = false;
    }
  }

  ngOnDestroy(): void {
    this.destroyed$.next(null);
  }

  private initLayout() {
    this.isLargeScreen$.pipe(
      takeUntil(this.destroyed$),
      tap(isLargeScreen => {
        const margin = (isLargeScreen && !this.board) ? 300 : 0;
        this.setMargin(margin);
      })
    ).subscribe();
  }

  private setMargin(margin: number): void {
    this.sidebar.elementRef.nativeElement.style.marginLeft = `${margin}px`;
    this.content.nativeElement.style.marginLeft = `${margin}px`;
  }

  private setBoardTheme(board: Board | undefined) {
    if (!board) return;
    if (this.sidebar) {
      this.sidebar.elementRef.nativeElement.style.backgroundColor = board.theme.sidebarBackground;
      this.sidebar.elementRef.nativeElement.style.color = board.theme.sidebarText;
    }
    if (this.content) this.content.nativeElement.style.backgroundColor = board.theme.boardBackground;
    if (this.topnav) this.topnav.elementRef.nativeElement.style.backgroundColor = board.theme.topnavBackground;
  }

  onSidebarToggle(isOpen: boolean): void {
    if (isOpen) this.elementRef.nativeElement.classList.remove('closed');
    else this.elementRef.nativeElement.classList.add('closed');
  }

  private getIsLargeScreen(): boolean {
    return window.innerWidth >= ScreenSize.Medium;
  }
}
