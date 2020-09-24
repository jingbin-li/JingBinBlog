export interface IVerificationJTW {
  /**
   * get
   */
  getIsLegitimate(jwt: string): boolean;

}
