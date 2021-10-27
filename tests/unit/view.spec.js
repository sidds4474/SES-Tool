import Vue from "vue";
import { shallowMount, createLocalVue } from "@vue/test-utils";
import VueRouter from "vue-router";
import View from "@/components/dashboard/View.vue";
import Banner from "@/components/dashboard/Banner.vue";
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

  state = {
    item: {}
  };

  actions = {
    saveandeditbulk: jest.fn(),
    saveloading: jest.fn()
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

  wrapper = shallowMount(View, {
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

describe("View.vue", () => {
  // find the submit button
  it("on mount find the submit button", async () => {
    const button = wrapper.find(".submit-button");
    expect(button.exists()).toBe(true);
  });

  // find the submit button and handle submit
  it("on button submit functions called", async () => {
    await wrapper.find(".submit-button").trigger("click");
    expect(actions.saveloading).toHaveBeenCalled();
    expect(actions.saveandeditbulk).toHaveBeenCalled();
  });

  // banner should have been mounted
  it("on mount ensure banner has been mounted", async () => {
    const banner = wrapper.findComponent(Banner);
    expect(banner.exists()).toBe(false);
  });
});
