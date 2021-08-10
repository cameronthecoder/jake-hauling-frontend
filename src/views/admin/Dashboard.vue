<template>
  <div class="flex flex-col md:flex-row gap-6">
     <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
   integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
   crossorigin=""/>
    <div class="md:w-4/6">
    <div class="flex justify-between">
      <section>
      <h1 class="text-4xl font-body" v-if="user">
        Good afternoon, {{ user.first_name }}
      </h1>
      <h2 class="text-lg mb-10 text-gray-400 font-medium border-none mt-3 font-body">
        July 22nd, 2021
      </h2>
      </section>
      <section>
        <div class="relative">
        <input type="text" placeholder="Search" name="search" class="font-body py-3 px-4 rounded-md bg-gray-200" id="">
        </div>
      </section>
      </div>
      <img
        src="/tail-spin.svg"
        class="h-20 m-auto"
        v-if="loading.readyOrders"
        alt=""
      />
      <p class="text-gray-500 mb-4 font-body text-2xl font-light">Analytics within past week</p>
      <div class="flex flex-col md:flex-row gap-4 items-center">
        <div class="bg-white w-full p-6 rounded-2xl shadow-md">
          <div class="flex gap-4 items-center">
          <div class="bg-primary-600 rounded-md flex px-4 py-4 items-center text-white">
            <TruckIcon class="h-8 w-8" />
          </div>
          <section>
            <h1 class="text-4xl text-gray-400 font-body font-light">Orders</h1>
            <h1 class="text-6xl font-body font-bold">23</h1>
          </section>
          </div>
        </div>
                <div class="bg-white w-full p-6 rounded-2xl shadow-md">
          <div class="flex gap-4 items-center">
          <div class="bg-primary-600 rounded-md flex px-4 py-4 items-center text-white">
            <ClipboardListIcon class="h-8 w-8" />
          </div>
          <section>
            <h1 class="text-3xl text-gray-400 font-body font-light">Invoices</h1>
            <h1 class="text-6xl font-body font-bold">23</h1>
          </section>
          </div>
        </div>
                <div class="bg-white w-full p-6 rounded-2xl shadow-md">
          <div class="flex gap-4 items-center">
          <div class="bg-primary-600 rounded-md flex px-4 py-4 items-center text-white">
            <TruckIcon class="h-8 w-8" />
          </div>
          <section>
            <h1 class="text-4xl text-gray-400 font-body font-light">Orders</h1>
            <h1 class="text-6xl font-body font-bold">23</h1>
          </section>
          </div>
        </div>
      </div>
      <p class="text-gray-500 mb-5 font-body text-2xl mt-10 font-light">Orders ready soon</p>
      <div class="flex flex-col gap-4">
         <article class="rounded-lg shadow p-8 bg-white w-full" v-for="order in orders" :key="order.po_number">
          <div class="flex items-center justify-between">
            <div class="flex gap-4 items-center">
              <div class="bg-black shadow text-white rounded-2xl p-2">
                <TruckIcon class="h-8 w-8" />
              </div>
              <section>
                  <p class="text-lg font-bold font-body text-gray-900"><LocationMarkerIcon class=" text-gray-400 inline-block w-6 h-6" /> {{order.location}}</p>
                  <p class="text-base text-gray-500 font-medium antialiased font-body underlined">{{order.company}}</p>
              </section>
            </div>
            <section>
              <p class="text-base text-gray-400 font-body font-normal">#{{order.po_number}}</p>
            </section>
            <section class="flex items-center gap-4">
              <button class="px-2 py-2 bg-primary-600 shadow flex items-center rounded-full text-white"><EyeIcon class="w-6 h-6" /></button>
            </section>
          </div>
        </article>
      </div>
    </div>

    <div class="flex-1">
      <p class="text-gray-500 mb-4 font-body text-2xl font-light">Orders within next month</p>
      <div class="bg-white h-64 rounded-2xl shadow w-full">
        
      </div>
    </div>
  </div>
</template>

<script>
import TextInput from "../../components/TextInput.vue";
import Item from "../../components/Item.vue";
import DataCard from "../../components/DataCard.vue";
import ReadyOrders from "../../components/ReadyOrders.vue";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import {
  ClockIcon,
  CheckIcon,
  LocationMarkerIcon,
  ClipboardListIcon,
  EyeIcon,
  TruckIcon
} from "@heroicons/vue/outline";
import "leaflet/dist/leaflet.css";

export default {
  components: {
    TextInput,
    CheckIcon,
    Item,
    ReadyOrders,
    EyeIcon,
    LocationMarkerIcon,
    DataCard,
    ClockIcon,
    ClipboardListIcon,
    TruckIcon,
  },

  setup() {
    const store = useStore();
    const currentPage = ref(1);
    const myChart = ref();
    const zoom = ref(2);
    const orders = ref([
      {
        "company": "Quality Woods Furniture",
        "location": "Rochester, MN",
        "po_number": "32432324",
      },
      {
        "company": "Cabinfield Woodworking",
        "location": "Lancaster, PA",
        "po_number": "892342455"
      },
      {
        "company": "Harmony Cedar",
        "location": "Minneapolis, MN",
        "po_number": "567456432"
      },
    ])

    const getReadyOrders = () => store.dispatch("companies/getReadyOrders");

    return {
      loading: computed(() => store.getters['companies/loading']),
      user: computed(() => store.getters['auth/user']),
      currentPage,
      myChart,
      zoom,
      getReadyOrders,
      orders
    };
  },
  created() {
    this.getReadyOrders();
  }
};
</script>

<style>
</style>