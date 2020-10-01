import { Request, Response, NextFunction as NF } from "express";
import { StatusCodes } from "http-status-codes";
import { ApiResult } from "../interface";
import { HTTPException } from "./middlewareModel/HTTPException";

const accessRouteGuard = (_req: Request, _res: Response, next: NF) => {
  const token = _req.headers.authorization;
  if(token){
    next()
  }else{
  }
};
export default {};
