<template>
  <div class="content-table">
    <!-- This example requires Tailwind CSS v2.0+ -->
    <div class="bg-indigo-600 mb-3">
      <div class="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between flex-wrap">
          <div class="w-0 flex-1 flex items-center">
            <span class="flex p-2 rounded-lg bg-indigo-800">
              <!-- Heroicon name: speakerphone -->
              <svg
                class="h-6 w-6 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                />
              </svg>
            </span>
            <p class="ml-3 font-medium text-white truncate">
              <span class="md:hidden">
                Send Bulk Mails
              </span>
              <span class="hidden md:inline">
                All Mails
              </span>
            </p>
          </div>
          <div
            class="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto"
          >
            <a href="#">
              
            </a>
          </div>
          <div class="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
           
          </div>
        </div>
      </div>
    </div>

    <!-- This example requires Tailwind CSS v2.0+ -->
    <div class="flex flex-col">
      <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div class="shadow overflow-hidden border-b border-gray-200">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-700">
                <tr>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                  >
                    Mail Name
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th scope="col" class="relative px-6 py-3">
                    <span class="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="(item, index) in items" :key="index">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="ml-4">
                        <div
                          class="text-sm font-medium text-gray-900"
                          v-if="item.title"
                        >
                          {{ item.title }}
                        </div>
                        <div class="text-sm text-gray-500" v-if="item.subject">
                          {{ item.subject }}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900" v-if="item.createdAt">
                      {{ item.createdAt }}
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span
                      v-if="item.status"
                      class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"
                    >
                      {{ item.status }}
                    </span>
                  </td>
                  <td
                    class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                  >
                    <a
                      @click="editItem(item, index)"
                      class="text-indigo-600 hover:text-indigo-900"
                      >Edit</a
                    >
                  </td>
                </tr>

                <!-- More items... -->
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Main",
  data() {
    return {
      //
    };
  },
  // computed
  computed: {
    // all items
    items() {
      return this.$store.state.bulk.all;
    }
  },
  // methods
  methods: {
    ...mapActions("bulk", ["saveeditedindex", "saveselected"]),
    // edit item
    editItem(e, index) {
      this.saveselected(e); // save the selected item
      this.saveeditedindex(index); // save edited index
      this.$router.push("/dashboard/view"); // send to view page
    }
  }
};
</script>
