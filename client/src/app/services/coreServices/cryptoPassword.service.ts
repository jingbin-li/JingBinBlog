import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
@Injectable()
export class CryptPassword {
  constructor() {}

  public userEncryptionByMD5({userName,passWord}: any): any {
    const result = CryptoJS.MD5(passWord).toString();
    
    return {userName, passWord: result};
  }
}
