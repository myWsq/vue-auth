# Vue Router Role
> A simple route guard based on role. [Demo](https://mywsq.github.io/vue-router-role)

## Installation
```shell
$ yarn add vue-router-role
# or
$ npm install vue-router-role
```
## Documentation
First, you have to make sure that you users have only one role and each  path can be accessed by multiple users, like that:
```js
# user
{
    username:"xxx",
    role:"PUBLIC",
    ...
}
```  
```json
# route
{
    path: "/",
    meta:{
        roles: ["PUBLIC","ADMIN"]
    }
    ...
}
```
If routes have no roles, it means the path can be accessed by any user.

### Usage
```js
/** router.js */
import Role from "vue-router-role";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Vue from "vue";

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: "/",
            component: Home
        },
        {
            path: "/dashboard",
            meta: {
                roles: ["PUBLIC"],
            },
            component: () => import("./views/Dashboard"),
        }
        {
            path: "/admin",
            meta: {
                roles: ["ADMIN"],
            },
            component: () => import("./views/Admin.vue"),
        },
    ]
})

new Role({
    router,
    getRole: () => "PUBLIC"
})

export default router
```

```js
/** main.js */
import Vue from "vue";
import router from "./router.js";
import App from "./App.vue";

new Vue({
  router,
  render: h => h(App),
}).$mount("#app");
```

### Configuration
```typescript
export interface VueRouterRoleOptions {
  /** vue-router instance */
  router: VueRouter;
  /** get current authorized user's role */
  getRole: () => string | Promise<string>;
  /** login route path, default: ['/login'] */
  loginPath?: string;
  /** forbidden route path, default: ['/403'] */
  forbiddenPath?: string;
  /** roles field in route.meta, default:['roles'] */
  metaField?: string;
  /** called before redirect to login path */
  onNoAuth?: (to: Route, from: Route) => any;
  /** called before redirect to forbidden path */
  onForbidden?: (to: Route, from: Route) => any;
}
```
