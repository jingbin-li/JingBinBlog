import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  NzMessageComponent,
  NzMessageService,
  NzPlacementType,
} from 'ng-zorro-antd';
import { ApiResult } from 'src/app/interface/ApiResult';
@Component({
  selector: 'articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.less'],
})
export class ArticlesListComponent implements OnInit {
  listOfPosition: NzPlacementType[] = ['bottomLeft'];
  isTableLoading = false;
  listOfData = [];
  isVisible = false;
  articlesContents = '';
  constructor(
    private http: HttpClient,
    private message: NzMessageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getList();
  }

  async getList() {
    const re = await this.http
      .get<ApiResult>('/api/v1/admin/articlesList')
      .toPromise();
    this.listOfData = re.data;
  }

  async removeArticle(id) {
    const params = new HttpParams().set('_id', id);
    const re = await this.http
      .delete<ApiResult>('/api/v1/admin/removeArticles', { params })
      .toPromise();

    re.code === 200
      ? this.message.create('success', '删除成功')
      : this.message.create('error', '删除失败');
    this.getList();
  }
  updataAticles(id) {
    this.router.navigateByUrl(`/home/articles/editArticles?articlesId=${id}`);
  }

  previewContents(content) {
    this.articlesContents = content;
    this.isVisible = true;
  }
  handleOk() {
    this.isVisible = false;
  }
  handleCancel() {
    this.isVisible = false;
  }
}
