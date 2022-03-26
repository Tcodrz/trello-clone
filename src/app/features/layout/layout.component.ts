import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { BehaviorSubject, map, mergeMap } from 'rxjs';
import { ScreenSize } from 'src/app/core/interface/screen-size.enum';
import { BoardsService } from './../../core/services/boards.service';
import { WorkspaceService } from './../../core/services/workspace.service';
import { SidebarComponent } from './../sidebar/sidebar.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements AfterViewInit {
  @ViewChild('sidebar') sidebar!: SidebarComponent;
  @ViewChild('content') content!: ElementRef;
  @HostListener('window:resize') onResize() {
    const isSmallScreen = window.innerWidth >= ScreenSize.Large;
    this.isSmallScreen$.next(isSmallScreen);
  }
  isSmallScreen$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(
    private elementRef: ElementRef,
    private workspaceService: WorkspaceService,
    private boardsService: BoardsService,
  ) { }
  ngAfterViewInit(): void {
    this.isSmallScreen$.asObservable().pipe(
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
      )),
      mergeMap(workspace =>
        this.boardsService.getCurrentBoard().pipe(
          map(board => {
            if (!!board)
              this.elementRef.nativeElement.style.backgroundColor = workspace?.backgroundColor;
            else this.elementRef.nativeElement.style.backgroundColor = 'transparent';
          })
        ))).subscribe();
  }
  onSidebarToggle(isOpen: boolean): void {
    if (isOpen) this.elementRef.nativeElement.classList.remove('closed');
    else this.elementRef.nativeElement.classList.add('closed');
  }
}
