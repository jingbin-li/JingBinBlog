import { UserController } from "../controllers/commonController";
import { IController } from "../interface";
import {
  ArticlesManagementController,
  UserManagementController,
} from "../controllers/adminControllers";
import {HomeController} from "../controllers/blogControllers"
const controllers: { new (): IController }[] = [
  UserController,
  UserManagementController,
  ArticlesManagementController,
  HomeController
];
const routes = controllers.map((item) => {
  return new item();
});
export default routes;
