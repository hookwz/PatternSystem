// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import store from "../store/index";
// import VueiClient from '@supermap/vue-iclient-mapboxgl';
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.use(ElementUI);
Vue.config.productionTip = false;
// Vue.use(VueiClient);
/* eslint-disable no-new */
new Vue({
  el: "#app",
  store,
  components: { App },
  template: "<App/>"
});
