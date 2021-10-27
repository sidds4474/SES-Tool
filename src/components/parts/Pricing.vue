<template>
  <div class="footer">
    <!-- This example requires Tailwind CSS v2.0+ -->
    <div class="py-12 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="lg:text-center">
          <h2
            class="text-base text-indigo-600 font-semibold tracking-wide uppercase"
          >
            Pricing
          </h2>
          <p
            class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl"
          >
            Our plans are the best
          </p>
          <p class="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Lorem ipsum dolor sit amet consect adipisicing elit. Possimus magnam
            voluptatum cupiditate veritatis in accusamus quisquam.
          </p>
        </div>

        <div class="mt-10">
          <div class="grid sm:grid-cols-3 gap-4">
            <div
              class="flex bg-gray-70 shadow-xl px-5 py-10"
              v-for="(item, index) in items"
              :key="index"
            >
              <div class="ml-4">
                <dt class="text-xl leading-6 font-medium text-gray-900">
                  {{ item.title }}
                </dt>
                <dd class="text-base mt-3 text-gray-500">
                  {{ item.text }}
                </dd>
                <dt class="mt-7 mb-7 leading-6">
                  <span class="text-lg text-gray-500">USD</span>
                  <span class="text-4xl font-extrabold text-gray-900">
                    ${{ item.price }}</span
                  ><span class="text-gray-500 ml-1">/mo</span>
                </dt>
                <button
                  type="submit"
                  class="group relative w-full flex justify-center py-2 px-4 mb-7 border border-transparent text-sm rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span class="text-lg">Buy {{ item.title }}</span>
                </button>
                <hr />
                <dd class="mt-3 mb-4 text-gray-700 font-medium">
                  WHAT'S INCLUDED
                </dd>
                <dd
                  class="mt-1 text-base text-gray-500"
                  v-for="(item, index) in item.details"
                  :key="index"
                >
                  {{ item }}
                </dd>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          title: "Basic",
          price: "5.00",
          text:
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor",
          details: [
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit."
          ]
        },
        {
          title: "Standard",
          price: "7.00",
          text:
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor",
          details: [
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit."
          ]
        },
        {
          title: "Premium",
          price: "11.00",
          text:
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor",
          details: [
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit."
          ]
        }
      ]
    };
  }
};
</script>
