<template>
  <div class="relative h-screen bg-black flex flex-col-reverse md:flex-row">
    <sidebar />
    <div class="flex-1 md:rounded-l-3xl bg-white overflow-auto p-8 md:p-10 font-bold">
      <router-view />
    </div>
  </div>
  <div v-if="!user" class="bg-white fixed w-100 h-100 top-0 left-0 right-0 bottom-0 z-10 flex items-center justify-center">
    <img src="../../assets/tail-spin.svg" class="h-32" alt="">
  </div>
</template>

<script>
import Sidebar from "../../components/Sidebar.vue";
import {useStore} from "vuex"
import {computed} from "vue"
export default {
  components: { Sidebar },
  setup() {
    const store = useStore();

    return {
      user: computed(() => store.getters.user),
    }
  }
};
</script>

<style>
</style>