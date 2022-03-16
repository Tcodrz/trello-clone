import { StateService } from './state/state.service';
import { Component } from '@angular/core';
import { Login, Logout } from './state/user/user.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'trello-clone';
  constructor(private state: StateService) { }
  ngOnInit() {
    this.state.state.subscribe((state) => console.log(state));
    this.state.dispatch(Login({ payload: { id: '', name: 'Tom' } }));
    this.state.dispatch(Logout({ user: { id: '', name: '' } }));
  }
}
