import { Component, OnInit } from '@angular/core';
import { Icons } from '../../ui-components/button/icon/icons';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  Icons = Icons;
  constructor() { }

  ngOnInit(): void {
  }

}
