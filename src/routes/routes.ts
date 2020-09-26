import { UserController } from "../controllers/commonController";
import { IController } from "../interface";
import { UserManagementController } from "../controllers/adminControllers";
const controllers: { new (): IController }[] = [
  UserController,
  UserManagementController,
];
const routes = controllers.map((item) => {
  return new item();
});
export default routes;
