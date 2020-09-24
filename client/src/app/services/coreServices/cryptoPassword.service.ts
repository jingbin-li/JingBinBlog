import { Injectable } from '@angular/core';
import * as cryptoRandomString from 'crypto-random-string';
import { UserLogin } from 'src/app/interface/UserLogin';
import * as CryptoJS from 'crypto-js';
@Injectable()
export class CryptPassword {
  constructor() {}

  public userEncryptionByMD5(formObj: UserLogin): any {
    console.log(formObj);
    
    const { userName, passWord } = formObj;
    console.log(passWord);
    
    const result = CryptoJS.MD5(passWord).toString();
    return { userName, passWord: result };
  }
}
