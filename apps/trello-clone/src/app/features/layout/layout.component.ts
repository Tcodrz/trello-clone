import {Board, ScreenSize, Theme, Workspace} from '@trello-clone/trello-interface';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  ViewChild
} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {TopnavComponent} from '../topnav/topnav.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent implements AfterViewInit, OnChanges {
  @Input() board: Board | undefined;
  @Input() workspace: Workspace | null = null;
  @ViewChild('topnav') topnav!: TopnavComponent;
  private isLargeScreen$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.getIsLargeScreen());
  private hasChanges = false;
  theme$: BehaviorSubject<Theme | null> = new BehaviorSubject<Theme | null>(null);

  @HostListener('window:resize') onResize() {
    this.isLargeScreen$.next(this.getIsLargeScreen());
  }

  constructor(
    private elementRef: ElementRef,
  ) {
  }

  ngOnChanges(): void {
    this.hasChanges = true;
  }

  ngAfterViewInit(): void {
    if (this.hasChanges) {
      this.setBoardTheme(this.board);
      this.hasChanges = false;
    }
  }

  private setBoardTheme(board: Board | undefined) {
    if (!board) return;
    this.theme$.next(board.theme);
  }

  onSidebarToggle(isOpen: boolean): void {
    if (isOpen) this.elementRef.nativeElement.classList.remove('closed');
    else this.elementRef.nativeElement.classList.add('closed');
  }

  private getIsLargeScreen(): boolean {
    return window.innerWidth >= ScreenSize.Medium;
  }
}
