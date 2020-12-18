import { AController } from "../../abstract/AController.controller";
import { IController } from "../../interface";
import { Router, Request, Response, NextFunction as NF } from "express";
export class CommentController extends AController implements IController {
  protected basePath: string;
  public router: Router;
  constructor() {
    super();
    this.basePath = "/articles";
    this.router = Router();
    this.attachToRoutes();
  }
  protected attachToRoutes(): void {}
}
