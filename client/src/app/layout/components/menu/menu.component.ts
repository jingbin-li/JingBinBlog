import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/coreServices';
@Component({
  selector: 'layout-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.less'],
})
export class LayoutMenu implements OnInit {
  isCollapsed = false;
  public currentUrl: string;
  public menuList = [
    { menuName: '用户管理', router: '/home/users', icon: 'user' },
    { menuName: '文章管理', router: '/home/articles', icon: 'form' },
    { menuName: '评论管理', router: '/home/comments', icon: 'comment' },
    { menuName: '留言管理', router: '/home/messages', icon: 'alert' },
    { menuName: '归档管理', router: '/home/archives', icon: 'folder' },
    { menuName: '网站统计', router: '/home/statistics', icon: 'line-chart' },
  ];
  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly currentUser: UserService
  ) {}

  ngOnInit() {
    this.currentUrl = this.router.url;
  }

  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
