import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzPlacementType } from 'ng-zorro-antd';
@Component({
  selector: 'articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.less'],
})
export class ArticlesListComponent implements OnInit {
  listOfPosition: NzPlacementType[] = ['bottomLeft'];
  isTableLoading = false;
  listOfData = [];
  constructor() {}

  ngOnInit() {}
}
