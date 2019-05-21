import VueRouer, { Route } from "vue-router";

export default function(options) {
  const { router, getRole, onForbidden, onNoAuth } = options;
  const metaField = options.metaField || "roles";
  const forbiddenPath = options.forbiddenPath || "/403";
  const loginPath = options.loginPath || "login";
  if (!(router instanceof VueRouer)) {
    throw new Error("router must be a instance of vue-rouer constructor");
  }

  router.beforeEach(async (to, from, next) => {
    const role = await getRole();

    if (
      to.matched.every(route => {
        const roles = route.meta[metaField];
        return !roles || (role && roles.includes(role));
      })
    ) {
      next();
    } else if (role) {
      onForbidden && onForbidden(to, from);
      next(`${forbiddenPath}?required=${to.meta[metaField]}`);
    } else {
      onNoAuth && onNoAuth(to, from);
      next(`${loginPath}?next=${to.path}`);
    }
  });
}
