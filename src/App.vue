<template>
  <router-view />
</template>

<script>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { onBeforeUnmount } from "@vue/runtime-core";
export default {
  setup() {
    const store = useStore();
    const loadUser = () => store.dispatch("auth/loadUser");

    return {
      loadUser,
    };
  },
  created() {
    if (this.$route.name !== "Login") {
      this.loadUser();

      const timer = setInterval(() => {
        this.loadUser();
      }, 300000);

      onBeforeUnmount(() => {
        clearInterval(timer);
      })
    }
  },
};
</script>

