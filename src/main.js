import Vue from "vue";
import './plugins/vuetify'
import App from "./App.vue";
import router from "./router";
import store from "./store";
import LayoutBasic from "./components/LayoutBasic.vue";
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@fortawesome/fontawesome-free/css/all.css'

Vue.config.productionTip = false;
Vue.component("LayoutBasic", LayoutBasic);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount("#app");
