import { Request, Response, NextFunction as NF } from "express";
import { StatusCodes } from "http-status-codes";
import { HTTPException } from "./middlewareModel/HTTPException";

const NotMatchedRoute = (_req: Request, _res: Response, next: NF) => {
  const error: HTTPException = new HTTPException(404, "未分配路由");
  next(error);
};

const errorMiddleware = (
  err: HTTPException,
  _req: Request,
  res: Response,
  _next: NF
) => {
  res.status(err.status || StatusCodes.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: err.message,
    errors: err.errors,
  });
};
export default { NotMatchedRoute, errorMiddleware };
