import Vue from "vue";
import { shallowMount, createLocalVue } from "@vue/test-utils";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import Header from "@/components/parts/Header";
import Section from "@/components/parts/Section";
import Footer from "@/components/parts/Footer";
import Pricing from "@/components/parts/Pricing";
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

  wrapper = shallowMount(Home, {
    localVue,
    stubs: ["router-link", "router-view"],
    router
  });
});

afterEach(() => {
  wrapper.destroy();
});

describe("Home.vue", () => {
  //check if header, footer, pricing and section components are available on mount
  it("check if header, footer, pricing and section components are available", () => {
    const header = wrapper.findComponent(Header);
    const footer = wrapper.findComponent(Footer);
    const products = wrapper.findComponent(Section);
    const pricing = wrapper.findComponent(Pricing);
    expect(header.exists()).toBe(true);
    expect(footer.exists()).toBe(true);
    expect(products.exists()).toBe(true);
    expect(pricing.exists()).toBe(true);
  });
});
