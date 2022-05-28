import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Icons} from "@ui-components";

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
})
export class LogoComponent {
  @Output() clicked: EventEmitter<void> = new EventEmitter<void>();
  Icons = Icons;
}
