import { IController, IVerificationJTW } from "../interface";
import * as CryptoJS from "crypto-js";
import * as jwt from "jsonwebtoken";
import * as httpContext from "express-http-context";
import { Request, Response, NextFunction as NF } from "express";
import { IContextUser } from "../interface/IContextUser.interface";
import { decode } from "punycode";
import { HTTPException } from "../middleware/middlewareModel/HTTPException";
const VerificationJwt = (req: Request, res: Response, next: NF) => {
  const token = req.headers.authorization;
  const privateKey = process.env.SECRET_KEY;
  if (token) {
    jwt.verify(token, privateKey, (err, decoded) => {
      if (err) {
        const erro = new HTTPException(404, "No permission", err);
        next(erro);
      } else {
        const user: IContextUser = {
          userName: decoded.sub,
          role: decoded.role,
        };
        httpContext.set("user", user);
        next();
      }
    });
  } else {
    const reqUrl = req.url;
    // if (reqUrl === "/api/v1/user/verification") {
    //   next();
    // } else {
    //   const reuslt = new HTTPException(404, "No Authority");
    //   next(reuslt);
    // }
    next();
  }
};

export default VerificationJwt;
