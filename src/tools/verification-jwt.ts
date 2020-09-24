import { IVerificationJTW } from "../interface";

import * as CryptoJS from "crypto-js";
export class VerificationJTW implements IVerificationJTW {
  getIsLegitimate(jwt: string): boolean {
    const jwtStr = CryptoJS.enc.Base64.parse(jwt).toString(CryptoJS.enc.Utf8);
    return true;
  }
}
