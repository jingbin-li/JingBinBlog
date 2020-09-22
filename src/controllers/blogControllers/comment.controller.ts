import { AController } from "../../abstract/AController.controller";
import { IController } from "../../interface";
import { Router, Requset, Response, NextFunction as NF } from "express";
export class CommentController extends AController implements IController {
  protected basePath: string;
  public router: Router;
  constructor() {
    super();
    this.basePath = "/conmment";
    this.router = Router();
    this.attachToRoutes();
  }
  protected attachToRoutes(): void {}
}
