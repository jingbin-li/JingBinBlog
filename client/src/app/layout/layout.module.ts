import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LayoutRoutingModule } from './layout-routing';
import { HomeComponent } from './home/home.component';
import { LayoutMenu } from './components/menu/menu.component';

const SystemModules = [
  CommonModule,
  HttpClientModule,
  NgZorroAntdModule,
  ReactiveFormsModule,
  FormsModule,
];

@NgModule({
  declarations: [HomeComponent, LayoutMenu],
  imports: [...SystemModules, LayoutRoutingModule],
  exports: [],
  providers: [],
})
export class LayoutModule {}
