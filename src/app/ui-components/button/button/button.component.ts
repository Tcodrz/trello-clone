import { Component, Input } from '@angular/core';
import { Icons } from '../icon/icons';

export type ButtonTypes = 'button' | 'submit';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() type: ButtonTypes = 'button';
  @Input() icon: Icons = Icons.None;
  @Input() className: string = '';
  @Input() disabled: boolean = false;
}
