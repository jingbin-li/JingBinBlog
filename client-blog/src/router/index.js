import Vue from "vue";
import VueRouter from "vue-router";
const Home = () => import("../components/Home.vue");
const About = () => import("../components/About.vue");
const Articles = () => import("../components/Articles.vue");
const MessageBoard = () => import("../components/MessageBoard.vue");
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    component: About,
  },
  {
    path: "/articles",
    component: Articles,
  },
  {
    path: "/messageBoard",
    component: MessageBoard,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
