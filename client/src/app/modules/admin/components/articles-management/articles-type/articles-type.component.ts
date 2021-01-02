import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService, NzPlacementType } from 'ng-zorro-antd';
import { ApiResult } from 'src/app/interface/ApiResult';
import tinymce from 'tinymce';
import { environment } from '../../../../../../environments/environment';
@Component({
  selector: 'articles-type',
  templateUrl: './articles-type.component.html',
  styleUrls: ['./articles-type.component.less'],
})
export class ArticlesTypeComponent implements OnInit {
  listOfPosition: NzPlacementType[] = ['bottomLeft'];
  content: any;
  isVisible = false;
  listOfData = [];
  articlesTypeForm: FormGroup;
  isTableLoading: false;
  modalTitle = '';
  currentType = '';
  currentTypeObj: any;
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private message: NzMessageService
  ) {}
  ngOnInit() {
    this.getList();
    this.articlesTypeForm = this.fb.group({
      articleType: [null, Validators.required],
      menuType: [null],
    });
  }

  async getList() {
    const result = await this.http
      .get<ApiResult>('/api/v1/admin/articlesTypeList')
      .toPromise();
    this.listOfData = result.data;
  }

  showModal(type: string, data?: any): void {
    this.currentType = type;
    if (type === 'create') {
      this.modalTitle = '创建分类';
      this.articlesTypeForm.patchValue({
        menuType: 'secondaryMenu',
      });
    }
    if (type === 'update') {
      this.currentTypeObj = data;
      this.modalTitle = '更新分类';
      this.articlesTypeForm.patchValue({
        articleType: data.articleType,
        menuType: data.menuType,
      });
    }
    this.isVisible = true;
  }

  async handleOk(): Promise<void> {
    let res;
    let messageSuccess = '';
    let messageFail = '';
    const articleTypeForm = this.articlesTypeForm.value;
    if (this.currentType === 'create') {
      res = await this.http
        .post<ApiResult>('/api/v1/admin/articlesType', articleTypeForm)
        .toPromise();
      messageSuccess = '创建成功';
      messageFail = '创建失败';
    }
    if (this.currentType === 'update') {
      articleTypeForm._id = this.currentTypeObj._id;
      res = await this.http
        .post<ApiResult>('/api/v1/admin/updateArticlesType', articleTypeForm)
        .toPromise();
      messageSuccess = '更新成功';
      messageFail = '更新失败';
    }
    if (res.code === 200) {
      this.message.create('success', messageSuccess);
    } else {
      this.message.create('error', messageFail);
    }
    this.getList();
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  //removeArticlesType
  async removeAticlesType(_id) {
    const params = new HttpParams().set('_id', _id);
    const result = await this.http
      .delete<ApiResult>(`/api/v1/admin/removeArticlesType`, {
        params,
      })
      .toPromise();
    if (result.code === 200) {
      this.message.create('success', '删除成功');
      this.getList();
    } else {
      this.message.create('error', '删除失败');
    }
  }
}
