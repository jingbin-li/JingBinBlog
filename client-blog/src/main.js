import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store";
import "./plugins/element.js";
import "./index.less";
import _ from "lodash";
import prismCss from "@/assets/prism.css";
import prismjs from "prismjs";
prismjs.highlightAll();
Vue.prototype._ = _;
Vue.config.productionTip = false;
Vue.use(prismCss);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
