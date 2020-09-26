import { Injectable } from '@angular/core';
import * as cryptoRandomString from 'crypto-random-string';
import { UserLogin } from 'src/app/interface/UserLogin';
import * as CryptoJS from 'crypto-js';
import * as jwt from 'jsonwebtoken';
@Injectable()
export class CryptPassword {
  constructor() {}

  public userEncryptionByMD5(formObj: any): any {
    const result = CryptoJS.MD5(formObj.passWord).toString();
    formObj.passWord = result;
    return formObj;
  }
}
