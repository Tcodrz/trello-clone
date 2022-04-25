import { ScreenSize } from './../../core/interface/screen-size.enum';
import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, HostListener, Input, OnDestroy, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Board } from './../../core/interface/board.interface';
import { SidebarComponent } from './../sidebar/sidebar.component';
import { TopnavComponent } from './../topnav/topnav.component';
import { AppColors } from '../../core/interface/app-colors.enum';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent implements AfterViewInit, OnChanges {
  @Input() board: Board | undefined;
  @ViewChild('sidebar') sidebar!: SidebarComponent;
  @ViewChild('topnav') topnav!: TopnavComponent;
  @ViewChild('content') content!: ElementRef;
  isLargeScreen$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.getIsLargeScreen());
  @HostListener('window:resize') onResize() {
    this.isLargeScreen$.next(this.getIsLargeScreen());
  }
  constructor(
    private elementRef: ElementRef,
  ) { }
  ngOnChanges(changes: SimpleChanges): void {
    this.setBoardTheme(this.board);
  }
  ngAfterViewInit(): void {
    this.topnav.elementRef.nativeElement.style.backgroundColor = AppColors.Blue;
  }
  setBoardTheme(board: Board | undefined) {
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
  getIsLargeScreen(): boolean {
    return window.innerWidth >= ScreenSize.Large;
  }
}
