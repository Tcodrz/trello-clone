import { StoreService } from '../../../state/state.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feed',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss']
})
export class BoardsComponent implements OnInit {

  constructor(
    private store: StoreService,
  ) { }

  ngOnInit(): void {
    this.store.select('workspaceState').subscribe(state => {
      console.log(state);
    })
  }

}
