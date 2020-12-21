import { UserController } from "../controllers/commonController";
import { IController } from "../interface";
import {
  ArticlesManagementController,
  UserManagementController,
} from "../controllers/adminControllers";
import {
  HomeController,
  ArticlesController,
  AboutController,
  CommentsController,
} from "../controllers/blogControllers";
const controllers: { new (): IController }[] = [
  UserController,
  UserManagementController,
  ArticlesManagementController,
  HomeController,
  ArticlesController,
  AboutController,
  CommentsController,
];
const routes = controllers.map((item) => {
  return new item();
});
export default routes;
