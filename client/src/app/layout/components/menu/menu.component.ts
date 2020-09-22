import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'layout-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.less'],
})
export class LayoutMenu implements OnInit {
  isCollapsed = false;
  public currentUrl: string;
  public menuList = [
    { menuName: '用户管理', router: '/admin/users', icon: 'user' },
    { menuName: '文章管理', router: '/admin/articles', icon: 'form' },
    { menuName: '评论管理', router: '/admin/comments', icon: 'comment' },
    { menuName: '留言管理', router: '/admin/messages', icon: 'alert' },
    { menuName: '归档管理', router: '/admin/archives', icon: 'folder' },
    { menuName: '网站统计', router: '/admin/statistics', icon: 'line-chart' },
  ];
  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.currentUrl=this.router.url;
  }

  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
