<template>
  <div class="flex flex-col md:flex-row gap-6">
     <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
   integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
   crossorigin=""/>
    <div class="md:w-4/6">
      <h1 class="text-4xl font-body" v-if="user">
        Good afternoon, {{ user.first_name }}
      </h1>
      <h2 class="text-lg mb-10 text-gray-400 font-medium mt-3 font-body">
        July 22nd, 2021
      </h2>
      <img
        src="../../assets/tail-spin.svg"
        class="h-20 m-auto"
        v-if="loading"
        alt=""
      />
      <p class="text-gray-500 text-2xl font-light">Orders ready for this week</p>
      <div class="flex flex-col mt-5 gap-4">
         <article class="rounded shadow p-4 bg-white w-full">
          <div class="flex items-center justify-between">
            <div class="flex gap-4 items-center">
              <div class="bg-primary-500 shadow text-white rounded p-2">
                <TruckIcon class="h-8 w-8" />
              </div>
              <section>
                  <p class="text-lg font-bold font-body text-gray-900"><LocationMarkerIcon class=" text-gray-400 inline-block w-6 h-6" /> New York, NY</p>
                  <p class="text-base text-gray-500 font-medium antialiased font-body underlined">Quality Woods Furniture</p>
              </section>
            </div>
            <section>
              <p class="text-base text-gray-400 font-body font-normal">#343434</p>
            </section>
            <section class="flex items-center gap-4">
              <button class="px-2 py-2 bg-gray-200 shadow flex items-center rounded-full text-gray-700"><EyeIcon class="w-6 h-6" /></button>
              <button class="px-2 py-2 bg-green-500 shadow flex items-center rounded-full text-white"><CheckIcon class="w-6 h-6" /></button>
            </section>
          </div>
        </article>
        <article class="rounded shadow p-4 bg-white w-full">
          <div class="flex items-center justify-between">
            <div class="flex gap-4 items-center">
              <div class="bg-primary-500 shadow text-white rounded p-2">
                <TruckIcon class="h-8 w-8" />
              </div>
              <section>
                  <p class="text-lg font-bold font-body text-gray-900"><LocationMarkerIcon class=" text-gray-400 inline-block w-6 h-6" /> Duluth, MN</p>
                  <p class="text-base font-medium antialiased font-body text-gray-500 underlined">Quality Woods Furniture</p>
              </section>
            </div>
            <section>
              <p class="text-base text-gray-400 font-body font-normal">#343434</p>
            </section>
            <section class="flex items-center gap-4">
              <button class="px-2 py-2 bg-gray-200 shadow flex items-center rounded-full text-gray-700"><EyeIcon class="w-6 h-6" /></button>
              <button class="px-2 py-2 bg-green-500 shadow flex items-center rounded-full text-white"><CheckIcon class="w-6 h-6" /></button>
            </section>
          </div>
        </article>
        <article class="rounded shadow p-4 bg-white w-full">
          <div class="flex items-center justify-between">
            <div class="flex gap-4 items-center">
              <div class="bg-primary-500 shadow text-white rounded p-2">
                <TruckIcon class="h-8 w-8" />
              </div>
              <section>
                  <p class="text-lg font-bold font-body"><LocationMarkerIcon class=" text-gray-400 inline-block w-6 h-6" /> Lanesboro, MN</p>
                  <p class="text-base font-medium antialiased font-body underlined">Quality Woods Furniture</p>
              </section>
            </div>
            <section>
              <p class="text-base text-gray-400 font-body font-normal">#343434</p>
            </section>
            <section class="flex items-center gap-4">
              <button class="px-2 py-2 bg-gray-200 shadow flex items-center rounded-full text-gray-700"><EyeIcon class="w-6 h-6" /></button>
              <button class="px-2 py-2 bg-green-500 shadow flex items-center rounded-full text-white"><CheckIcon class="w-6 h-6" /></button>
            </section>
          </div>
        </article>
      </div>
      <div class="p-3 rounded shadow-lg">
        <p>{{zoom}}</p>
                      <l-map
          :center="[47.41322, -1.219482]"
          v-model="zoom"
          v-model:zoom="zoom"
          style="height:50vh"
        >
            <l-tile-layer
              url="https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY2FtZXJvbmNvZGVzIiwiYSI6ImNrbGR2YXBpbjAxNXQycHBrZmJ0bXR6YjEifQ.OmuqPuHveyAqDwbPgfTM4Q"
              attribution="Copyright (c) 2021 Mapbox"
              :tileSize="512"
              :zoomOffset="-1"
              :maxZoom="18"
              accessToken="pk.eyJ1IjoiY2FtZXJvbmNvZGVzIiwiYSI6ImNrbGR2YXBpbjAxNXQycHBrZmJ0bXR6YjEifQ.OmuqPuHveyAqDwbPgfTM4Q"
            ></l-tile-layer>

                  <l-marker :lat-lng="[47.41322, -1.219482]">
                </l-marker>
        </l-map>
      </div>
    </div>

    <div class="flex-1">
      <div class="p-3 rounded shadow-lg">
        <h1 class="text-lg font-bold font-body">Top Accounts</h1>
      </div>

      <div class="p-3 rounded shadow-lg">
        <h1 class="text-lg font-bold font-body">Order Statistics</h1>
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
  LMap,
  LIcon,
  LTileLayer,
  LMarker,
  LControlLayers,
  LTooltip,
  LPopup,
  LPolyline,
  LPolygon,
  LRectangle,
} from "@vue-leaflet/vue-leaflet";
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
     LMap,
    LIcon,
    LTileLayer,
    LMarker,
    LControlLayers,
    LTooltip,
    LPopup,
    LPolyline,
    LPolygon,
    LRectangle,
  },

  setup() {
    const store = useStore();
    const currentPage = ref(1);
    const myChart = ref();
    const zoom = ref(2);

    const getReadyOrders = () => store.dispatch("getReadyOrders");

    return {
      loading: computed(() => store.getters.loading),
      user: computed(() => store.getters.user),
      currentPage,
      myChart,
      zoom,
      getReadyOrders,
    };
  },
  created() {
    this.getReadyOrders();
  }
};
</script>

<style>
</style>