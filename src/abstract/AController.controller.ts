import { Router } from "express";
export abstract class AController {
  protected abstract basePath: string;
  protected abstract attachToRoutes(): void;
}
