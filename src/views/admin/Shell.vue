<template>
  <div class="relative h-screen bg-white flex flex-col-reverse md:flex-row">
    <sidebar />
    <div
      class="
        flex-1
        bg-gray-100
        overflow-auto
        font-bold
      "
    >
    <div class="p-8 mt-5 md:p-10">
      <alerts />
      <router-view />
    </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "../../components/Sidebar.vue";
import { useStore } from "vuex";
import { computed } from "vue";
import Alerts from "../../components/Alerts.vue";
export default {
  components: { Sidebar, Alerts },
  setup() {
    const store = useStore();

    return {
      userLoading: computed(() => store.getters.userLoading),
    };
  },
};
</script>

<style>
</style>