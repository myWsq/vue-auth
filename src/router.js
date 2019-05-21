import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import store from "./store";
import VueAuth from "../index";
Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      component: Home,
    },
    {
      path: "/public",
      meta: {
        roles: ["PUBLIC"],
      },
      component: () => import("./views/About.vue"),
    },
    {
      path: "/admin",
      meta: {
        roles: ["ADMIN"],
      },
      component: () => import("./views/About.vue"),
    },
    {
      path: "/both",
      meta: {
        roles: ["PUBLIC", "ADMIN"],
      },
      component: () => import("./views/About.vue"),
    },
    {
      path: "/login",
      component: () => import("./views/Login.vue"),
    },
    {
      path: "/403",
      component: () => import("./views/403.vue"),
    },
  ],
});

new VueAuth({
  router,
  metaField: "roles",
  loginPath: "/login",
  forbiddenPath: "/403",
  async getRole() {
    let { me } = store.state;
    if (!me) {
      me = await store.dispatch("getMe");
    }
    return store.state.me && store.state.me.role;
  },
});

export default router;
