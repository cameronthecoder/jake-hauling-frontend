<template>
  <router-view />
</template>

<script>
import { useStore } from 'vuex'
export default {
  setup() {
    const store = useStore();

    const loadUser = () => store.dispatch('loadUser');

    return {
      loadUser
    }
  },
  created() {
    this.loadUser();
  }
}
</script>

