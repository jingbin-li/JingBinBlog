import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'layout-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.less'],
})
export class LayoutMenu implements OnInit {
  isCollapsed = false;
  constructor() {}

  ngOnInit() {}

  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
