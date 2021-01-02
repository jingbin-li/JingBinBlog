import Vue from "vue";
import VueRouter from "vue-router";
const Home = () => import("../components/Home.vue");
const About = () => import("../components/About.vue");
const Articles = () => import("../components/ArticlesComponents/Articles.vue");
const MessageBoard = () => import("../components/MessageBoard.vue");
const ArticlesDetail = () =>
  import("../components/ArticlesComponents/ArticlesDetail.vue");
const ArticlesList = () =>
  import("../components/ArticlesComponents/ArticlesList.vue");
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
    redirect: "/articles/list",
    component: Articles,
    children: [
      {
        path: "details",
        component: ArticlesDetail,
      },
      {
        path: "list",
        component: ArticlesList,
      },
    ],
  },
  {
    path: "/messageBoard",
    component: MessageBoard,
  },
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});

export default router;
