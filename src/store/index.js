import Vue from "vue";
import Vuex from "vuex";
import { bulk } from "./bulk.module";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    bulk
  }
});
