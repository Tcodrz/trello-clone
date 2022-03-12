import { Icons } from './../icon/icon.component';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() type: 'button' | 'submit' = 'button';
  @Input() icon: Icons = Icons.None;
  @Input() className: string = '';
  @Input() disabled: boolean = false;

}
