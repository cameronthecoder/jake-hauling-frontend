<template>
  <div class="relative h-screen bg-white flex flex-col-reverse md:flex-row">
    <sidebar />
    <div
      class="
        flex-1
        md:rounded-l-3xl
        bg-gray-50
        overflow-auto
        p-8
        md:p-10
        font-bold
      "
    >
      <alerts />
      <Suspense>
        <template #default>
          <router-view />
        </template>
        <template #fallback>
          <div
            class="
              bg-white
              fixed
              w-100
              h-100
              top-0
              left-0
              right-0
              bottom-0
              z-10
              flex
              items-center
              justify-center
            "
          >
            <img src="../../assets/tail-spin.svg" class="h-32" alt="" />
          </div>
        </template>
      </Suspense>
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