export interface Payload {
  iss: string; //该JWT的签发者
  iat: number; //签发时间
  exp?: number; //过期时间
  nbf?: number; //该时间之前不接收处理该Token
  sub: string; //面向的用户
  // jti: "9f10e796726e332cec401c569969e13e"; //该Token唯一标识
}
