import { UserController } from "../controllers/commonController";
import { IController } from "../interface";
import {
  ArticlesManagementController,
  UserManagementController,
} from "../controllers/adminControllers";
const controllers: { new (): IController }[] = [
  UserController,
  UserManagementController,
  ArticlesManagementController,
];
const routes = controllers.map((item) => {
  return new item();
});
export default routes;
