<template>
  <div class="bulk-form">
    <div class="md:grid md:grid-cols-3 md:gap-6">
      <div class="md:col-span-1">
        <div class="px-4 sm:px-0">
          <h3 class="text-lg font-medium leading-6 text-gray-900">
            Add all the Content to send bulk mails.
          </h3>
          <p class="mt-1 text-sm text-gray-600">
          </p>
        </div>
      </div>
      <div class="mt-5 md:mt-0 md:col-span-2">
        <div class="shadow sm:rounded-md sm:overflow-hidden">
          <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
            <div class="grid grid-cols-3 gap-6">
              <div class="col-span-3 sm:col-span-2">
                <label
                  for="company_website"
                  class="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <div class="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="text"
                    v-model="item.title"
                    name="bulk_title"
                    id="bulk_title"
                    class="border-solid border-2 px-2 py-2 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                  />
                </div>
                <p class="mt-2 text-sm text-gray-500">
                  What is the title of this mail.
                </p>
              </div>
            </div>

            <div>
              <label
                for="about"
                class="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div class="mt-1">
                <textarea
                  id="email"
                  name="email"
                  rows="3"
                  v-model="item.addresses"
                  class="border-solid border-2 px-2 py-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                ></textarea>
              </div>
              <p class="mt-2 text-sm text-gray-500">
                Add all your email, separate with commas. Email
                format example@example.com.
              </p>
              <button
                type="button"
                class="mt-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Import
              </button>
            </div>

            <div>
              <label
                for="about"
                class="block text-sm font-medium text-gray-700"
              >
                Subject
              </label>
              <div class="mt-1">
                <textarea
                  id="subject"
                  name="subject"
                  v-model="item.subject"
                  rows="3"
                  class="border-solid border-2 px-2 py-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Write your content"
                ></textarea>
              </div>
            </div>

            <div>
              <label
                for="about"
                class="block text-sm font-medium text-gray-700"
              >
                Mail Content
              </label>
              <div class="mt-1">
                <textarea
                  id="content"
                  v-model="item.content"
                  name="content"
                  rows="3"
                  class="border-solid border-2 px-2 py-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Write your content"
                ></textarea>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">
                Attachment
              </label>
              <input
                type="checkbox"
                v-model="value"
                @change="checkattachment"
                name="attachment_checkbox"
                id="attachment_checkbox"
                class="border-gray-300 rounded-none rounded-r-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <span v-if="show" class="text-sm text-green-700"
                ><i>Processing....</i></span
              >
              <div
                v-if="value"
                class="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
              >
                <div class="space-y-1 text-center">
                  <svg
                    class="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <div class="flex text-sm text-gray-600">
                    <label
                      for="file-upload"
                      class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        @change="uploadimage"
                        class="sr-only"
                      />
                    </label>
                    <p class="pl-1">or drag and drop</p>
                  </div>
                  <p class="text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
              <li
                v-if="item.attachment"
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
                  <span class="ml-2 flex-1 w-0 truncate">
                    {{ item.attachment }}
                  </span>
                </div>
                <div class="ml-4 flex-shrink-0">
                  <a
                    @click="removeupload"
                    class="font-medium text-red-600 hover:text-red-500"
                  >
                    Remove
                  </a>
                </div>
              </li>
            </div>
          </div>
          <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button
              @click="gotopreview"
              type="button"
              class="preview-button inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Preview
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { sortsenderemail, sortsenderphone } from "../script";
export default {
  name: "Bulk",
  data() {
    return {
      value: false,
      item: {
        status: "Active",
        createdAt: new Date()
      },
      show: false,
      file: ""
    };
  },
  methods: {
    ...mapActions("bulk", ["saveselected"]),
    // check if attachment is selected
    checkattachment() {
      if (this.value === true) {
        localStorage.setItem("@attachment", true);
      } else {
        localStorage.setItem("@attachment", false);
      }
    },
    // go to preview
    async gotopreview() {
      let response = Object.assign({}, this.item);
      const email_check = localStorage.getItem("@bulkemail");
      const phone_check = localStorage.getItem("@bulkphone");
      // check if we are dealing with email or phone
      if (email_check) {
        response.addresses = await sortsenderemail(this.item.addresses);
      } else if (phone_check) {
        response.addresses = await sortsenderphone(this.item.addresses);
      }
      // save your item in vuex
      await this.saveselected(response);
      // reset item object
      this.item = {
        status: "Active",
        createdAt: new Date()
      };
      // send to view ad save item
      this.$router.push("/dashboard/view");
    },
    // upload image
    uploadimage(e) {
      this.show = true;
      let file = e.target.files[0];
      this.item.attachment = file.name;
      // check image size max limit 20MB

      // get base 64
      const reader = new FileReader();
      let preview;
      reader.addEventListener(
        "load",
        function() {
          // convert image file to base64 string
          preview = reader.result;
        },
        false
      );
      if (file) {
        reader.readAsDataURL(file);
      }
      setTimeout(() => {
        this.item.base64 = this.sortbase64image(preview);
        this.show = false;
      }, 1000);
    },
    // sort base64 image
    sortbase64image(item) {
      const response = item.split(",");
      return response[1];
    },
    // remove upload
    removeupload() {
      // clear uploaded file
      document.getElementById("file-upload").value = "";
      this.file = "";
    }
  }
};
</script>
