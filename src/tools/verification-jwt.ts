import { IController, IVerificationJTW } from "../interface";
import * as CryptoJS from "crypto-js";
import * as jwt from "jsonwebtoken";
import * as httpContext from "express-http-context";
import { Request, Response, NextFunction as NF } from "express";
import { IContextUser } from "../interface/IContextUser.interface";
import { decode } from "punycode";
const VerificationJwt = (req: Request, res: Response, next: NF) => {
  const token = req.headers.authorization;
  const privateKey = process.env.SECRET_KEY;
  if (token) {
    //console.log(token);
    jwt.verify(token, privateKey, (err, decoded) => {
      if (err) {
        console.log(err);
        next(err);
      } else {
        //console.log(decoded);
        const user: IContextUser = {
          userName: decoded.sub,
          role: decoded.role,
        };
        httpContext.set("user", user);
        next();
      }
    });
  } else {
    next();
  }
};

export default VerificationJwt;
