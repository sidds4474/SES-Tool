import Vue from "vue";
import { shallowMount, createLocalVue } from "@vue/test-utils";
import VueRouter from "vue-router";
import Bulk from "@/components/dashboard/Bulk.vue";
// eslint-disable-next-line no-unused-vars
import bulk from "../../src/store/bulk.module";
import Vuex from "vuex";
// initilaize routes
if (!process || process.env.NODE_ENV !== "test") {
  Vue.use(VueRouter);
}

let wrapper;
let state;
let actions;
let store;
let localVue;
let router;

beforeEach(() => {
  localVue = createLocalVue();
  router = new VueRouter();
  Vue.use(Vuex);

  router = {
    push: jest.fn()
  };

  state = {};

  actions = {
    saveselected: jest.fn(),
    saveandeditbulk: jest.fn()
  };

  store = new Vuex.Store({
    modules: {
      bulk: {
        state,
        actions,
        namespaced: true
      }
    }
  });

  wrapper = shallowMount(Bulk, {
    localVue,
    stubs: ["router-link", "router-view"],
    store,
    mocks: {
      $router: router
    }
  });
});

afterEach(() => {
  wrapper.destroy();
});

describe("Bulk.vue", () => {
  // find the preview button
  it("on mount find the preview button", async () => {
    const button = wrapper.find(".preview-button");
    expect(button.exists()).toBe(true);
  });

  // find the preview button and handle submit
  it("on button preview functions called", async () => {
    await wrapper.find(".preview-button").trigger("click");
    expect(actions.saveselected).toHaveBeenCalled();
    expect(router.push).toHaveBeenCalledWith("/dashboard/view");

  });
});
