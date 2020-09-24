import { Injectable } from '@angular/core';
import * as crypto from 'crypto';
import * as cryptoRandomString from 'crypto-random-string';
import { UserLogin } from 'src/app/interface/UserLogin';
import * as CryptoJS from 'crypto-js';
@Injectable()
export class CryptPassword {
  constructor() {}

  public userEncryptionByMD5(formObj: UserLogin): any {
    const { userName, passWord } = formObj;
    const result = CryptoJS.MD5(passWord).toString();
    return { userName, passWord: result };
  }
}
