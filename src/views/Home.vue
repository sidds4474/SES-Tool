<template>
  <div class="home">
    <Header />
    <Section />
    <Pricing />
    <Footer />
  </div>
</template>

<script>
import Header from "../components/parts/Header";
import Section from "../components/parts/Section";
import Footer from "../components/parts/Footer";
import Pricing from "../components/parts/Pricing";
export default {
  name: "Home",
  components: { Header, Section, Footer, Pricing },
  data() {
    return {
      //
    };
  }
};
</script>
