import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { MenuItem } from '@ui-components';
import { Theme } from '@trello-clone/trello-interface';

export const DEFAULT_LINK_HOVER_COLOR = 'rgba(9, 30, 66, 0.08)';

@Component({
  selector: 'app-sidebar-links',
  templateUrl: './sidebar-links.component.html',
  styleUrls: ['./sidebar-links.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarLinksComponent implements AfterViewInit {
  @Input() menuItems: MenuItem[] | null = [];
  @Input() theme: Theme | undefined;
  @ViewChild('links') links: ElementRef | undefined;

  ngAfterViewInit(): void {
    this.initStyles();
  }

  initStyles(): void {
    this.setLinksStyle({
      color: this.theme?.sidebarText,
    });
  }

  onItemClick(item: MenuItem): void {
    if (item.command) item.command();
    this.resetLinksStyles()
  }

  onLinkHover(index: number) {
    const backgroundColor = this.theme?.sidebarLinksHover || DEFAULT_LINK_HOVER_COLOR;
    this.setSingleLinkStyle({
      backgroundColor: backgroundColor
    }, index);
  }

  onLinkBlur(index: number) {
    if (!this.isActiveLink(index)) {
      this.setSingleLinkStyle({
        backgroundColor: 'transparent'
      }, index);
    } else {
      this.setActiveLinkBackground(index);
    }
  }

  setLinksStyle(styles: object) { // set styles to all links
    if (this.links) {
      const collection = (this.links.nativeElement.children as HTMLCollection);
      let i = 0;
      while (i < collection.length)
        this.setSingleLinkStyle(styles, i++);
    }
  }

  setSingleLinkStyle(styles: object, index: number): void {
    if (this.links) {
      const collection = this.links.nativeElement.children as HTMLCollection;
      const element = collection.item(index)?.children.item(0) as HTMLAnchorElement;
      if (!element) return;
      Object.assign(element.style, styles);
    }
  }

  private isActiveLink(index: number): boolean {
    const element = this.getLinkByIndex(index);
    return element.classList.contains('active');
  }

  private getLinkByIndex(index: number): HTMLAnchorElement {
    const collection = this.links?.nativeElement.children as HTMLCollection;
    const element = collection.item(index)?.children.item(0) as HTMLAnchorElement;
    return element;
  }

  private setActiveLinkBackground(index: number) {
    const element = this.getLinkByIndex(index);
    element.style.backgroundColor = '#E4F0F6';
  }

  private resetLinksStyles(): void {
    const collection = this.links?.nativeElement.children as HTMLCollection;
    for (let i = 0; i < collection.length; i++) {
      const element = this.getLinkByIndex(i);
      element.style.backgroundColor =  this.theme?.sidebarBackground || 'initial';
    }
  }
}
