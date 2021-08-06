<template>
  <div class="flex flex-col md:flex-row justify-between items-center">
    <h1 class="text-4xl font-body">Companies ({{ results.total }})</h1>
    <button
      class="
        bg-primary-500
        font-bold
        focus:outline-none
        focus:ring-2 focus:ring-primary-300
        mt-3
        hover:bg-primary-700
        text-white
        px-6
        font-body
        text-center
        rounded-md
        py-4
      "
    >
      Create Company
    </button>
  </div>
  <input
    id="search"
    v-debounce:300="debounceInput"
    type="text"
    class="
      rounded-full
      w-full
      mb-5
      mt-5
      bg-gray-200
      border-none
      focus:outline-none
      placeholder-gray-500
      font-body
    "
    placeholder="Search"
  />
  <div class="flex justify-between items-center">
    <section>
        <p class="font-body mt-4">{{selected.length}} selected</p>
        <p class="font-body mt-4" v-if="search">Companies that contain "{{search}}"</p>
    </section>
    <section>
      <button
      class="
        bg-red-500
        font-bold
        focus:outline-none
        focus:ring-2 focus:ring-red-300
        mt-3
        hover:bg-red-700
        text-white
        px-3
        font-body
        text-center
        rounded-md
        py-2
      "
    >
      Remove Selected
    </button>
    </section>
  </div>

  <img
    src="tail-spin.svg"
    class="h-20 m-auto"
    v-if="loading"
    alt=""
  />
  <div class="flex flex-col mt-16">
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div
          class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
        >
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  class="
                    px-6
                    font-body
                    py-3
                    text-left text-xs
                    font-medium
                    text-gray-500
                    uppercase
                    tracking-wider
                  "
                >
                  
                </th>
                <th
                  scope="col"
                  class="
                    px-6
                    font-body
                    py-3
                    text-left text-xs
                    font-medium
                    text-gray-500
                    uppercase
                    tracking-wider
                  "
                >
                  ID
                </th>
                <th
                  scope="col"
                  class="
                    px-6
                    font-body
                    py-3
                    text-left text-xs
                    font-medium
                    text-gray-500
                    uppercase
                    tracking-wider
                  "
                >
                  Name
                </th>
                <th
                  scope="col"
                  class="
                    px-6
                    font-body
                    py-3
                    text-left text-xs
                    font-medium
                    text-gray-500
                    uppercase
                    tracking-wider
                  "
                >
                  Phone Number / Email
                </th>
                <th
                  scope="col"
                  class="
                    px-6
                    font-body
                    py-3
                    text-left text-xs
                    font-medium
                    text-gray-500
                    uppercase
                    tracking-wider
                  "
                >
                  Status
                </th>
                <th scope="col" class="relative px-6 py-3">
                  <span class="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="company in results.companies" :key="company.id">
                <td class="px-6 py-4">
                  <input type="checkbox" v-model="selected" :value="company.id" class="rounded text-primary-500 focus:ring-primary-600">
                </td>
                <td class="px-6 py-4">{{ company.id }}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="ml-4">
                      <div
                        class="
                          text-sm
                          font-body font-bold
                          text-primary-500
                          cursor-pointer
                        "
                      >
                        {{ company.name }}
                      </div>
                      <div class="text-sm font-body text-gray-500">
                        {{ company.address.city }}, {{ company.address.state }}
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-body text-gray-900">
                    {{ company.contact_email }}
                  </div>
                  <div
                    class="text-sm font-body text-gray-500"
                    v-if="company.phone_number != '1'"
                  >
                    {{ company.phone_number }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    class="
                      px-2
                      inline-flex
                      text-xs
                      leading-5
                      font-body
                      font-semibold
                      rounded-full
                      bg-green-100
                      text-green-800
                    "
                  >
                    Active
                  </span>
                </td>
                <td
                  class="
                    px-6
                    py-4
                    whitespace-nowrap
                    text-right text-sm
                    font-medium
                  "
                >
                  <a href="#" class="text-primary-600 font-body hover:text-primary-900"
                    >Edit</a
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  <div
    class="
      flex
      gap-4
      flex-wrap
      mt-6
      items-center
      overflow-auto
      rounded-md
      shadow-md
      p-6
      justify-center
    "
    v-if="pages"
  >
    <span
      v-for="p in Math.round(pages)"
      @click="setPage(p)"
      :class="{ 'bg-primary-600 text-white': page == p }"
      :key="p"
      class="
        p-2
        justify-center
        text-medium
        font-body
        cursor-pointer
        hover:bg-gray-200
        rounded-md
        flex
        items-center
      "
      >{{ p }}</span
    >
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed, ref, watchEffect } from "vue";
import { PencilIcon } from "@heroicons/vue/outline";
export default {
  components: {
    PencilIcon,
  },
  setup() {
    const store = useStore();
    const page = ref(1);
    const limit = ref(20);
    const search = ref("");
    const selected = ref([]);


    

    const getCompanies = () =>
      store.dispatch("getCompanies", {
        limit: limit.value,
        page: page.value,
        search: search.value,
      });

    watchEffect(() => {
      getCompanies();
    });

    const setPage = (p) => {
      page.value = p;
    };

    const debounceInput = (e) => {
      search.value = e;
    };

    return {
      loading: computed(() => store.getters.loading),
      results: computed(() => store.getters.companies),
      getCompanies,
      page,
      limit,
      search,
      setPage,
      selected,
      debounceInput,
    };
  },
  computed: {
    pages() {
      if (!this.search) {
        return this.results.total / this.limit;
      }
    },
  },
  created() {
    this.getCompanies();
  },
};
</script>

