import { UserController } from "../controllers/adminControllers";
import { IController } from "../interface";

const controllers: { new (): IController }[] = [UserController];
const routes = controllers.map((item) => {
  return new item();
});
export default routes;
