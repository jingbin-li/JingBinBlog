export interface Payload {
  iss: string; //该JWT的签发者
  exp?: number; //过期时间
  nbf?: number; //该时间之前不接收处理该Token
  sub: string; //面向的用户
  role: string;
}
