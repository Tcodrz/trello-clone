import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Theme } from "@trello-clone/trello-interface";

@Component({
  selector: 'ui-preview-card[title]',
  templateUrl: './preview-card.component.html',
  styleUrls: ['./preview-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewCardComponent implements AfterViewInit {
  @Input() theme: Theme | undefined;
  @Input() title: string = '';
  @ViewChild('prevCard', { static: false }) prevCard!: ElementRef;

  ngAfterViewInit(): void {
    if (this.theme) {
      this.setBoardCardStyles();
    } else {
      this.prevCard.nativeElement.style.placeContent = 'center';
    }
  }

  private setBoardCardStyles() {
    if (this.theme) {
      const element = this.prevCard.nativeElement as HTMLDivElement
      element.style.backgroundColor = this.theme.boardBackground;
      element.style.color = this.theme.sidebarText;
    }
  }
}
