import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { MenuItem } from '@ui-components';
import { Theme } from '@trello-clone/trello-interface';

const DEFAULT_LINK_HOVER_COLOR = 'rgba(9, 30, 66, 0.08)';

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
  linkStyles = {};

  ngAfterViewInit(): void {
    this.initStyles();
  }

  initStyles() {
    this.setLinksStyle({
      color: this.theme?.sidebarText,
      // backgroundColor: 'initial'
    });
  }

  onItmeClick(item: MenuItem) {
    if (item.command) item.command();
    this.resetLinksStyles()
  }

  onLinkHover(index: number) {
    const backgroundColor = this.theme?.sidebarLinksHover || DEFAULT_LINK_HOVER_COLOR;
    this.setSingleLinkSyle({
      backgroundColor: backgroundColor
    }, index);
  }

  onLinkBlur(index: number) {
    const backgroundColor = this.theme?.sidebarBackground || 'initial';
    if (!this.isActiveLink(index)) {
      this.setSingleLinkSyle({
        backgroundColor: backgroundColor
      }, index);
    } else {
      this.setActiveLinkBackground(index);
    }
  }

  setLinksStyle(styles: object) { // set styles to all links
    if (this.links) {
      const collection = (this.links.nativeElement.children as HTMLCollection);
      let i = 0;
      while (i < collection.length) {
        const parent = collection.item(i) as HTMLDivElement;
        const element = parent.children.item(0) as HTMLAnchorElement;
        Object.assign(element.style, styles);
        i++;
      }
    }
  }

  setSingleLinkSyle(styles: object, index: number) {
    if (this.links) {
      const collection = this.links.nativeElement.children as HTMLCollection;
      const element = collection.item(index)?.children.item(0) as HTMLAnchorElement;
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
