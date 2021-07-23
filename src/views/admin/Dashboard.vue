<template>
  <div class="flex flex-col md:flex-row gap-6">
    <div class="md:w-2/3">
      <h1 class="text-4xl font-body" v-if="user">
        Good afternoon, {{ user.first_name }}
      </h1>
      <h2 class="text-lg text-gray-400 font-medium mt-3 font-body">July 22nd, 2021</h2>
      <img
        src="../../assets/tail-spin.svg"
        class="h-20 m-auto"
        v-if="loading"
        alt=""
      />
      <div class="flex justify-between items-center">
        <h2 class="text-lg text-gray-800 font-medium mt-3 font-body">Orders</h2>
        <div class="flex gap-4 items-center">
          <p class="text-lg font-body text-gray-800 hover:bg-gray-200 py-1 cursor-pointer px-4 rounded-md">Week</p>
          <p
            class="
              text-lg
              font-body
              py-1
              px-4
              rounded-md
              text-center
              bg-primary-500
              text-primary-700
              bg-opacity-30
            "
          >
            Month
          </p>
          <p class="text-lg font-body text-gray-800 hover:bg-gray-200 py-1 px-4 rounded-md cursor-pointer">Year</p>
        </div>
      </div>
      <div class="flex mt-6 gap-4 flex-col md:flex-row">
        <div class="bg-white w-full rounded-2xl shadow p-6">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-5xl font-body">30</h1>
              <p class="font-medium font-body text-gray-500">Ready</p>
            </div>
            <div
              class="
                bg-opacity-30
                rounded-full
                p-3
                bg-primary-400
                text-primary-500
              "
            >
              <CheckCircleIcon class="w-6 h-6" />
            </div>
          </div>
        </div>
        <div class="bg-white w-full rounded-2xl shadow p-6">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-5xl font-body">180</h1>
              <p class="font-medium font-body text-gray-500">Loaded</p>
            </div>
            <div
              class="
                 bg-opacity-30 bg-green-400
                rounded-full
                p-3
                text-green-500
              "
            >
              <CheckCircleIcon class="w-6 h-6" />
            </div>
          </div>
        </div>
        <div class="bg-white w-full rounded-2xl shadow p-6">
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-5xl font-body">35</h1>
                    <p class="font-medium font-body text-gray-500">Pending</p>
                </div>
                <div class="bg-opacity-30 bg-yellow-400 rounded-full p-3 text-yellow-500">
                    <ClipboardListIcon class="w-6 h-6" />
                </div>
            </div>
        </div>
        <div class="bg-white w-full w rounded-2xl shadow p-6">
            <div class="flex items-center justify-between">
                <div>
                    <h1 class="text-5xl font-body">30</h1>
                    <p class="font-medium font-body text-gray-500">Delivered</p>
                </div>
                <div class="bg-opacity-30 rounded-full bg-indigo-400 text-indigo-500 p-3">
                    <TruckIcon class="w-6 h-6" />
                </div>
            </div>
        </div>
      </div>
      <div
        class="rounded-md p-6 shadow-lg mb-4"
        v-for="(value, company) in readyOrders"
        :key="company"
      >
        <h1 class="text-xl font-body">
          {{ company }}
          <span
            class="
              bg-gray-300
              text-gray-800
              px-2
              rounded-full
              bg-opacity-70
              uppercase
              font-bold
              tracking-wider
              font-body
            "
          >
            {{ value.length }}
          </span>
        </h1>
        <div class="md:ml-6 mt-6">
          <div v-for="order in value" :key="order.id">
            <div class="flex items-center md:justify-between mb-4">
              <div class="flex items-center gap-4">
                <div
                  class="
                    bg-primary-600 bg-opacity-70
                    border-4 border-gray-200
                    rounded-full
                    h-6
                    w-6
                  "
                ></div>
                <div>
                  <h1
                    class="
                      text-lg
                      font-medium font-body
                      text-primary-600
                      cursor-pointer
                    "
                  >
                    {{ order.order_number || order.delivery_address.to_from }}
                  </h1>
                  <h1 class="text-lg font-medium font-body text-gray-400">
                    {{ order.delivery_address.city }},
                    {{ order.delivery_address.state }}
                    {{ order.delivery_address.zip }}
                  </h1>
                  <span
                    class="
                      bg-green-300
                      inline-block
                      md:hidden
                      text-green-800
                      py-1
                      px-2
                      rounded-full
                      bg-opacity-70
                      uppercase
                      font-bold
                      tracking-wider
                      font-display
                    "
                  >
                    {{ order.status }}
                  </span>
                </div>
              </div>
              <div class="gap-4 ml-4 hidden md:flex">
                <div
                  class="
                    bg-green-300
                    text-green-800
                    py-1
                    px-2
                    rounded-full
                    bg-opacity-70
                    uppercase
                    font-bold
                    tracking-wider
                    font-display
                  "
                >
                  {{ order.status }}
                </div>
                <div
                  class="
                    bg-gray-200
                    text-gray-400
                    py-1
                    px-2
                    rounded-full
                    bg-opacity-70
                    uppercase
                    font-bold
                    tracking-wider
                    font-body
                  "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="rounded-md shadow mt-10 relative h-56 p-6 bg-black w-82">
            <canvas ref="myChart" class="w-full"></canvas>
      </div>

      <div class="flex flex-col items-center my-12">
        <div class="flex text-gray-700">
          <div
            class="
              h-8
              w-8
              mr-1
              flex
              justify-center
              items-center
              rounded-full
              bg-gray-200
              cursor-pointer
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-chevron-left w-4 h-4"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </div>
          <div
            class="flex h-8 font-medium rounded-full bg-gray-200"
            v-for="page in Object.keys(readyOrders).length"
            :key="page"
          >
            <div
              class="
                w-8
                md:flex
                justify-center
                items-center
                hidden
                cursor-pointer
                leading-5
                transition
                duration-150
                ease-in
                rounded-full
              "
              :class="{ 'bg-primary-600 text-white': page == currentPage }"
            >
              {{ page }}
            </div>
          </div>
          <div
            class="
              h-8
              w-8
              ml-1
              flex
              justify-center
              items-center
              rounded-full
              bg-gray-200
              cursor-pointer
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-chevron-right w-4 h-4"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <div class="flex-1">
      <h1 class="text-4xl font-body mb-3">Quick Actions</h1>
    </div>
  </div>
</template>

<script>
import TextInput from "../../components/TextInput.vue";
import Item from "../../components/Item.vue";
import { onMounted, computed, ref } from "vue";
import { useStore } from "vuex";
import { CheckCircleIcon, ClipboardListIcon, TruckIcon } from "@heroicons/vue/outline";
export default {
  components: {
    TextInput,
    CheckCircleIcon,
    Item,
    ClipboardListIcon,
    TruckIcon
  },

  setup() {
    const store = useStore();
    const currentPage = ref(1);
    const myChart = ref();

    const getReadyOrders = () => store.dispatch("getReadyOrders");

    onMounted(() => {
      var ctx = myChart.value.getContext("2d");
      var chart = new Chart(ctx, {
        type: "line",
        data: {
          labels: ["June", "July", "August", "September", "October", "November", "December"],
          datasets: [
            {
              label: "",
              data: [360, 250, 233, 200, 210, 433, 467],
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              borderColor: "rgba(8, 145, 178, 1)",
              pointBackgroundColor: "rgb(255, 255, 255, 1)",
              borderWidth: 6,
              lineTension: 0.4,
            },
          ],
        },
        options: {
            plugins: {
                legend: {
                    display: false,
                },
            },
                    responsive: true,
        maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                suggestedMin: 200,
                suggestedMax: 500,
                ticks: {
                  fontColor: "rgba(255, 255, 255, 1)",
                },
                gridLines: {
                  display: false,
                },
              },
            ],
            xAxes: [
              {
                ticks: {
                  fontColor: "rgba(255, 255, 255, 1)",
                },
                gridLines: {
                  color: "rgba(8, 145, 178, 1)",
                  zeroLineColor: "rgba(255, 255, 255, .2)",
                },
              },
            ],
          },
        },
      });
    });

    return {
      readyOrders: computed(() => store.getters.readyOrders),
      loading: computed(() => store.getters.loading),
      user: computed(() => store.getters.user),
      currentPage,
      myChart,
      getReadyOrders,
    };
  },
  created() {
    this.getReadyOrders();
  },
  computed: {
    name(fullName) {
      return fullName;
    },
  },
};
</script>

<style>
</style>