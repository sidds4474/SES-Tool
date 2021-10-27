import Vue from "vue";
import { shallowMount, createLocalVue } from "@vue/test-utils";
import VueRouter from "vue-router";
import Dashboard from "@/views/Dashboard.vue";
// initilaize routes
if (!process || process.env.NODE_ENV !== "test") {
  Vue.use(VueRouter);
}

let wrapper;
let localVue;
let router;

beforeEach(() => {
  localVue = createLocalVue();
  router = new VueRouter();

  wrapper = shallowMount(Dashboard, {
    localVue,
    stubs: ["router-link", "router-view"],
    router,
  });
});

afterEach(() => {
  wrapper.destroy();
});

describe("Dashboard.vue", () => {
  // check if create button has been mounted
  it("check if user is logged on mount", async () => {
    const button = wrapper.find(".create-button");
    expect(button.exists()).toBe(true);
  });
});
