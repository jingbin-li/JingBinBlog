import { Request, Response, NextFunction as NF } from "express";
import { StatusCodes } from "http-status-codes";
import { ApiResult } from "../interface";
import { HTTPException } from "./middlewareModel/HTTPException";

//路由匹配失败中间件
const NotMatchedRoute = (_req: Request, _res: Response, next: NF) => {
  const error: HTTPException = new HTTPException(404, "未分配路由");
  next(error);
};
//错误处理中间件
const errorMiddleware = (
  err: HTTPException,
  _req: Request,
  res: Response,
  _next: NF
) => {
  const result: ApiResult = {
    data: { success: false, message: err.message, errors: err.errors },
    code: err.status,
  };
  // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(result);
  res.json(result);
};
export default { NotMatchedRoute, errorMiddleware };
