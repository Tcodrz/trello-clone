import { MenuComponent } from './../menu/menu.component';
import { Component, OnInit, Input, HostListener, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit {
  @Input() title: string = '';
  @ViewChild('menu') menu?: MenuComponent;
  @HostListener('document:click', ['$event']) onBlur(event: Event) {
    const isOutside = !this.elementRef.nativeElement.contains(event.target);
    if (isOutside && this.menu?._show) this.menu.toggle();
  }
  constructor(
    private elementRef: ElementRef,
  ) { }

  ngOnInit(): void {
  }

}
