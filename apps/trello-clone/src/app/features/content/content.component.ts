import {Component, ElementRef, HostListener, Input} from '@angular/core';
import {ScreenSize, Theme, Workspace} from "@trello-clone/trello-interface";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent {
  private _workspace: Workspace | null = null;
  private _width: number = window.innerWidth;

  @Input() set workspace(workspace: Workspace | null) {
    this._workspace = workspace;
    this.calcPosition();
  }

  @Input() set theme(theme: Theme | null) {
    if (theme)
      this.setTheme(theme);
  }

  @HostListener('window:resize', ['$event']) onResize(event: Event) {
    this._width = (event?.target as Window)?.innerWidth || window.innerWidth;
    this.calcPosition();
  }

  constructor(private elementRef: ElementRef) {
  }

  calcPosition() {
    console.log(this._workspace, this._width);
    const isMediumScreen = this._width <= ScreenSize.Medium;
    const isLargeScreen = this._width > ScreenSize.Medium;
    if (!!this._workspace || isMediumScreen) this.setMargin(0);
    else if (isLargeScreen && !this._workspace) this.setMargin(300)
  }

  setMargin(margin: number): void {
    this.elementRef.nativeElement.style.marginLeft = `${margin}px`;
  }

  setTheme(theme: Theme): void {
    this.elementRef.nativeElement.style.backgroundColor = theme.boardBackground;
  }
}
