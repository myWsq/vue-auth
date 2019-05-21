import Vue from "vue";
import VueRouter, { Route } from "vue-router";

export interface VueAuthOptions {
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

declare function _default(options: VueAuthOptions): void;
export default _default;
