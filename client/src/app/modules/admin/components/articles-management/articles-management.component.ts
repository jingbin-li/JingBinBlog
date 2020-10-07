import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzPlacementType } from 'ng-zorro-antd';
@Component({
  selector: 'articles-manamgemnet',
  templateUrl: './articles-management.component.html',
  styleUrls: ['./articles-management.component.less'],
})
export class ArticlesManagementComponent implements OnInit {
  listOfPosition: NzPlacementType[] = ['bottomLeft'];
  isTableLoading = false;
  listOfData = [];
  constructor(
    private router:Router
  ) {}

  ngOnInit() {}

  jumpAticlesList(){
    this.router.navigateByUrl('/home/articles/articlesList');
  }
}
