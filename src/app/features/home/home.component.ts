import { Component, OnInit } from '@angular/core';
import { Icons } from '../../ui-components/button/icon/icon.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  Icons = Icons;
  constructor() { }

  ngOnInit(): void {
  }

}
