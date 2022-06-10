import { AfterViewInit, Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import { ScreenSize, Theme, Workspace } from "@trello-clone/trello-interface";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent implements AfterViewInit {
  private _workspace: Workspace | null = null;
  private _width: number = window.innerWidth;

  @ViewChild('content') content!: ElementRef;

  @Input() set workspace(workspace: Workspace | null) {
    this._workspace = workspace;
    this.calcPosition(this._width);
    this.setMaxWidth(this._width);
  }

  @Input() set theme(theme: Theme | null) {
    if (theme)
      this.setTheme(theme);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this._width = (event?.target as Window)?.innerWidth || window.innerWidth;
    this.calcPosition(this._width);
  }

  constructor(private elementRef: ElementRef) { }

  ngAfterViewInit(): void {
    this.setMaxWidth(this._width);
  }

  private calcPosition(width: number) {
    const isMediumScreen = width <= ScreenSize.Medium;
    const isLargeScreen = width > ScreenSize.Medium;
    if (!!this._workspace || isMediumScreen) this.setMargin(0);
    else if (isLargeScreen && !this._workspace) this.setMargin(300);

  }

  private setMargin(margin: number): void {
    this.elementRef.nativeElement.style.marginLeft = `${margin}px`;
  }

  private setTheme(theme: Theme): void {
    this.elementRef.nativeElement.style.backgroundColor = theme.boardBackground;
  }

  private setMaxWidth(width: number) {
    if (!this.content) return;
    const isLargeScreen = width > ScreenSize.Medium;
    if (isLargeScreen && !this._workspace)
      this.content.nativeElement.style.maxWidth = `${800}px`;
    else this.content.nativeElement.style.maxWidth = 'initial';
  }
}
