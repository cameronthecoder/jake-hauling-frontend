<template>
  <div class="flex flex-col md:flex-row justify-between items-center">
	  <h1 class="text-4xl font-body">Companies ({{ results.total }})</h1>
	  <button class="bg-primary-600 font-thin focus:outline-none focus:ring-2 focus:ring-primary-300 mt-3 hover:bg-primary-700 text-white px-2 font-body text-center rounded-md py-4">Create Company</button>
  </div> 
  <input id="search" v-debounce:300="debounceInput"  type="text" class="rounded-full w-full mb-5 mt-5 bg-gray-200 border-none focus:outline-none placeholder-gray-500 font-body" placeholder="Search">
  <img
    src="../../assets/tail-spin.svg"
    class="h-20 m-auto"
    v-if="loading"
    alt=""
  />
  <table class="table space-y-6 w-full shadow-md rounded-md text-gray-400 text-sm">
    <thead>
      <tr>
        <th class="p-6 font-body text-black text-left">ID</th>
        <th class="p-6 font-body text-black text-left">Name</th>
		<th class="p-6 font-body text-black text-left">Location</th>
		<th class="p-6 font-body text-black text-left">Phone Number</th>
		<th class="p-6 font-body text-black text-left">Email</th>
		<th class="p-6 font-body text-black text-left">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="company in results.companies" :key="company.id">
        <td class="p-6 font-body">{{ company.id }}</td>
        <td class="p-6">
            <div class="text-primary-600 text-xl cursor-pointer font-body">{{ company.name }}</div>
        </td>
		<td class="p-6 font-body">
            {{company.address.city}}, {{company.address.state}} {{company.address.zip}}
        </td>
		<td class="p-6 font-body">
			{{company.phone_number}}	
		</td>
		<td class="p-6 font-body">
			{{company.contact_email}}	
		</td>
		<td class="p-6 flex gap-4">
			<div class="bg-primary-600 text-white cursor-pointer text-center rounded-full p-2">
				<PencilIcon class="w-3 h-3" />
			</div>
		</td>
      </tr>
    </tbody>
  </table>

  <div class="flex gap-4 flex-wrap mt-6 items-center overflow-auto rounded-md shadow-md p-6 justify-center" v-if="pages">
	  <span v-for="p in Math.round(pages)" @click="setPage(p)" :class="{'bg-primary-600': page == p }" :key="p" class="p-2 justify-center text-medium font-body cursor-pointer hover:bg-gray-200 rounded-md flex items-center">{{p}}</span>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed, ref, watchEffect } from "vue";
import {PencilIcon} from '@heroicons/vue/outline'
import _debounce from 'lodash/functions';
export default {
  components: {
	  PencilIcon
  },
  setup() {
    const store = useStore();
	const page = ref(1);
	const limit = ref(20);
	const search = ref('');

    const getCompanies = () => store.dispatch("getCompanies", {limit: limit.value, page: page.value, search: search.value});

	watchEffect(() => {
		getCompanies();
	});

	const setPage = (p) => {
		page.value = p;
	}

	const debounceInput = (e) => {
		search.value = e;
	}

    return {
      loading: computed(() => store.getters.loading),
      results: computed(() => store.getters.companies),
      getCompanies,
	  page,
	  limit,
	  search,
	  setPage,
	  debounceInput
    };
  },
  computed: {
	  pages () {
		  if (!this.search) {
		  return this.results.total / this.limit
		  }
	  }
  },
  created() {
    this.getCompanies();
  },
};
</script>

