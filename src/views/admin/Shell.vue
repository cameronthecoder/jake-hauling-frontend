<template>
  <div class="relative h-screen bg-black flex flex-col-reverse md:flex-row">
    <sidebar />
    <div class="flex-1 md:rounded-l-3xl bg-white overflow-auto p-8 md:p-10 font-bold">
      <router-view />
    </div>
  </div>
</template>

<script>
import Sidebar from "../../components/Sidebar.vue";
export default {
  components: { Sidebar }
};
</script>

<style>
</style>