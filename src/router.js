import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import store from "./store";
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

router.beforeEach(async (to, from, next) => {
  let { me } = store.state;
  if (!me) {
    me = await store.dispatch("getMe");
  }
  if (
    to.matched.every(route => {
      const roles = route.meta.roles;
      return !roles || (me && roles.includes(me.role));
    })
  ) {
    next();
  } else if (me) {
    next(`/403?required=${to.meta.roles}`);
  } else {
    next(`/login?next=${to.path}`);
  }
});

export default router;
