import {Component, Input} from '@angular/core';
import {Paragraph} from "../../interface/paragraph.interface";
import {UiButton} from "../../interface/ui-button.interface";

@Component({
  selector: 'ui-paragraph',
  templateUrl: './paragraph.component.html',
  styleUrls: ['./paragraph.component.scss'],
})
export class ParagraphComponent implements Paragraph {
  @Input() title: string = '';
  @Input() text: string = '';
  @Input() dividerBottom?: boolean = false;
  @Input() dividerTop?: boolean = false;
  @Input() textLink?: UiButton;
}
