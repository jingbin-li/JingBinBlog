import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzPlacementType } from 'ng-zorro-antd';
import tinymce from 'tinymce';
@Component({
  selector: 'edit-articles',
  templateUrl: './edit-articles.component.html',
  styleUrls: ['./edit-articles.component.less'],
})
export class EditArticlesComponent implements OnInit {
  listOfPosition: NzPlacementType[] = ['bottomLeft'];
  content: any;
  constructor(private http: HttpClient) {}
  editorConfig = {
    self: this,
    // base_url: '/assets',
    height: 500,
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
    document_base_url: 'http://localhost:5000/',
    images_upload_handler: function (blobInfo, succFun, failFun) {
      let xhr: XMLHttpRequest;
      let formData: FormData;
      const token = localStorage.getItem('token');
      var file = blobInfo.blob(); //转化为易于理解的file对象
      console.log(blobInfo);
      console.log(file);
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
      console.log(formData.get('file'));

      xhr.send(formData);
    },
  };

  ngOnInit() {}

  async getCode() {
    // const code =  tinymce.i18n.getCode();
    // alert(code)
    console.log(this.content);
    await this.http.post('/api/v1/admin/uploadimages', '123').toPromise();
  }
}
