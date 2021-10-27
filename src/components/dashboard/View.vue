<template>
  <div>
    <Banner v-if="alert" />
    <!-- This example requires Tailwind CSS v2.0+ -->
    <div class="bg-white shadow overflow-hidden sm:rounded-lg">
      <div class="px-4 py-5 sm:px-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900">
          Bulk Email Information
        </h3>
        <p class="mt-1 max-w-2xl text-sm text-gray-500">
          Please Check the details correctly before sending.
        </p>
      </div>
      <div class="border-t border-gray-200">
        <dl>
          <div
            class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
          >
            <dt class="text-sm font-medium text-gray-500">
              Title
            </dt>
            <dd
              v-if="item"
              class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
            >
              {{ item.title }}
            </dd>
          </div>
          <div
            class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
          >
            <dt class="text-sm font-medium text-gray-500">
              Subject
            </dt>
            <dd
              v-if="item"
              class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
            >
              {{ item.subject }}
            </dd>
          </div>
          <div
            class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
          >
            <dt class="text-sm font-medium text-gray-500">
              Email address
            </dt>
            <dd
              v-if="item"
              class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
            >
              {{ item.addresses }}
            </dd>
          </div>
          <div
            class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
          >
            <dt class="text-sm font-medium text-gray-500">
              Date
            </dt>
            <dd
              v-if="item"
              class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
            >
              {{ item.createdAt }}
            </dd>
          </div>
          <div
            class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
          >
            <dt class="text-sm font-medium text-gray-500">
              Content
            </dt>
            <dd
              v-if="item"
              class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
            >
              {{ item.content }}
            </dd>
          </div>
          <div
            class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
          >
            <dt class="text-sm font-medium text-gray-500">
              Attachments
            </dt>
            <dd
              v-if="item"
              class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"
            >
              <ul
                v-if="item.attachment"
                class="border border-gray-200 rounded-md divide-y divide-gray-200"
              >
                <li
                  class="pl-3 pr-4 py-3 flex items-center justify-between text-sm"
                >
                  <div class="w-0 flex-1 flex items-center">
                    <!-- Heroicon name: paper-clip -->
                    <svg
                      class="flex-shrink-0 h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span v-if="item" class="ml-2 flex-1 w-0 truncate">
                      {{ item.attachment }}
                    </span>
                  </div>
                </li>
              </ul>
            </dd>
          </div>
          <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <span v-if="loading === true" class="text-sm text-green-700 mr-3"
              >Processing...</span
            >
            <button
              v-if="editedindex > 0 || editedindex === 0"
              @click="deleteItem"
              class="delete-button mr-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Delete Mail
            </button>
            <button
              @click="saveItem"
              class="submit-button inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Send Mail
            </button>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Banner from "./Banner";
export default {
  name: "Preview",
  components: { Banner },
  data() {
    return {
      alert: false
    };
  },
  // computed
  computed: {
    // retirive selected from vuex
    item() {
      return this.$store.state.bulk.selected;
    },
    loading() {
      return this.$store.state.bulk.loading;
    },
    editedindex() {
      return this.$store.state.bulk.editedIndex;
    }
  },
  methods: {
    ...mapActions("bulk", ["saveloading", "saveandeditbulk", "deletebulkitem"]),
    // save item
    saveItem() {
      this.saveloading(true);
      this.saveandeditbulk(this.item);
      // set an interval while you action is processed
      this.interval = setInterval(() => {
        if (this.loading === false) {
          clearInterval(this.interval);
          this.alert = true;
          // go to dashboard
          this.gotodashboard();
        }
      }, 500);
    },
    // go to dashboard
    gotodashboard() {
      setTimeout(() => {
        this.$router.push("/dashboard/main");
      }, 1000);
    },
    // delete item
    deleteItem() {
      this.saveloading(true);
      this.deletebulkitem();
      // set an interval while you action is processed
      this.interval = setInterval(() => {
        if (this.loading === false) {
          clearInterval(this.interval);
          this.$router.push("/dashboard/main");
        }
      }, 500);
    },
    // download image
    downloadimage() {
      //
    }
  }
};
</script>
