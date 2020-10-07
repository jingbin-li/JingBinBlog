import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/coreServices/user.service';
@Component({
  selector: 'layout-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
})
export class HomeComponent implements OnInit {
  isCollapsed = false;
  userName;
  role;
  constructor(private userService: UserService) {}

  ngOnInit() {
    const user = this.userService.getCurrentUser();
    this.userName = user.userName;
    this.role = user.role;
  }
}
