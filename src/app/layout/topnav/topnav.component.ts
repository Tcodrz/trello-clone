import { Component, OnInit } from '@angular/core';
import { Icons } from '../icon/icon.component';

export interface Link {
  route: string;
  label: string;
}

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss']
})
export class TopnavComponent implements OnInit {
  Icons = Icons;
  constructor() { }

  ngOnInit(): void {
  }

}
