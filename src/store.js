import Vue from "vue";
import Vuex from "vuex";
import { AppService } from "./service";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    me: null,
  },
  mutations: {
    setMe(state, me) {
      state.me = me;
    },
  },
  actions: {
    /** get authorized user info */
    async getMe({ commit }) {
      const { data } = await AppService.getUserInfo();
      if (!data.code) {
        commit("setMe", data.body);
      }
      return data.body;
    },

    /**
     * dispatch in login page
     * @param {{username, password}} payload
     * @returns { Promise<boolean> } is successful
     */
    async login(_, payload) {
      const { data } = await AppService.login(payload);
      return !data.code;
    },

    /** dispatch when logout button clicked */
    async logout({ commit }) {
      AppService.logout();
      commit("setMe", null);
    },
  },
});
