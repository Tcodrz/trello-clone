import { Component, Input } from '@angular/core';
import { PreviewItem } from "@trello-clone/trello-interface";


@Component({
  selector: 'ui-preview-card-list',
  templateUrl: './preview-card-list.component.html',
  styleUrls: ['./preview-card-list.component.scss'],
})
export class PreviewCardListComponent {
  @Input() items: PreviewItem[] | null = [];
  @Input() showLastCard: boolean = false;
  @Input() lastCardTitle: string = '';
}
