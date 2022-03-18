import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GotoService {

  constructor(
    private router: Router
  ) { }
  private goto(route: string, params?: object) {
    const commands: any[] = [route];
    if (!!params) commands.push(params);
    this.router.navigate(commands);
  }
  dashboard() {
    this.goto('dashboard/boards');
  }
}
