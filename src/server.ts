import * as express from "express";
import { App } from "./App";
import { IController } from "./interface";
import routes from "./routes/routes";
import * as dotenv from "dotenv";
dotenv.config();
//创建App类的实例 APP的实例在构造函数中会
const server = new App(5000, routes);
