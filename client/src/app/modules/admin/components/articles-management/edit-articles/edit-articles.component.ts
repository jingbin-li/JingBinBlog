import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService, NzPlacementType } from 'ng-zorro-antd';
import { ApiResult } from 'src/app/interface/ApiResult';
import tinymce from 'tinymce';
import { environment } from '../../../../../../environments/environment';
@Component({
  selector: 'edit-articles',
  templateUrl: './edit-articles.component.html',
  styleUrls: ['./edit-articles.component.less'],
})
export class EditArticlesComponent implements OnInit {
  listOfPosition: NzPlacementType[] = ['bottomLeft'];
  content: any;
  isVisible = false;
  mainMenuList = [];
  secondaryMenu = [];
  selectMainMenu = null;
  selectSecondaryMenu = null;
  articleId: any;
  constructor(
    private http: HttpClient,
    private message: NzMessageService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {}
  editorConfig = {
    self: this,
    // base_url: '/assets',
    height: 'calc(100vh - 395px)',
    menubar: false,
    plugins: ['emoticons image media code link'],
    toolbar:
      'undo redo | formatselect | bold italic backcolor | \
        alignleft aligncenter alignright alignjustify | \
        bullist numlist outdent indent | removeformat |\
        emoticons |image| media| link|code',
    language: 'zh_CN',
    language_url: '/assets/tinymce/lang/zh_CN.js',
    //relative_urls: true,
    document_base_url: environment.domainName,
    images_upload_handler: function (blobInfo, succFun, failFun) {
      let xhr: XMLHttpRequest;
      let formData: FormData;
      const token = localStorage.getItem('token');
      var file = blobInfo.blob(); //转化为易于理解的file对象
      xhr = new XMLHttpRequest();

      //xhr.setRequestHeader('testheader', 'testtest');
      // xhr.withCredentials = true;
      xhr.open('POST', '/api/v1/admin/images');
      xhr.setRequestHeader('Authorization', token);
      xhr.onload = function () {
        let json;
        if (xhr.status != 200) {
          failFun('HTTP Error: ' + xhr.status);
          return;
        }
        json = JSON.parse(xhr.responseText);
        if (!json || typeof json.location != 'string') {
          failFun('Invalid JSON: ' + xhr.responseText);
          return;
        }
        succFun(json.location);
      };
      formData = new FormData();
      formData.append('file', file, file.name); //此处与源文档不一样
      xhr.send(formData);
    },
  };

  ngOnInit() {
    this.getMenulist();
    const id = this.activeRoute.snapshot.queryParams.articlesId;
    if (id) {
      this.getArticles(id);
    }
  }

  async getMenulist() {
    const menuListRes = await this.http
      .get<ApiResult>('/api/v1/admin/menuList')
      .toPromise();
    const data = menuListRes.data;
    this.mainMenuList = data.mainMenuList;
    this.secondaryMenu = data.secondaryMenu;
  }
  async getCode() {
    await this.http.post('/api/v1/admin/uploadimages', '123').toPromise();
  }

  async submitArticle() {
    const postData = {
      _id: this.articleId || null,
      mainMenuId: this.selectMainMenu,
      secondaryMenuId: this.selectSecondaryMenu,
      content: this.content,
    };
    const result = await this.http
      .post<ApiResult>('/api/v1/admin/articles', postData)
      .toPromise();
    if (result.code === 200) {
      this.message.create('success', '提交成功');
    } else {
      this.message.create('error', '创建失败');
    }
  }
 
  async getArticles(id) {
    const params = new HttpParams().set('_id', id);
    const re = await this.http
      .get<ApiResult>('/api/v1/admin/articlesList', { params })
      .toPromise();
    console.log(re.data);
    const article = re.data[0];
    this.articleId = article._id;
    this.content = article.content;
    this.selectMainMenu = article.mainMenu[0]._id;
    this.selectSecondaryMenu = article.secondaryMenu[0]._id;
  }
}
