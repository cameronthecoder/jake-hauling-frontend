<template>
  <router-view class="antialiased" />
</template>

<script>
import { useStore } from 'vuex'
import {useRouter} from 'vue-router'
import { onMounted } from '@vue/runtime-core';
export default {
  setup() {
    const store = useStore();
    const loadUser = () => store.dispatch('loadUser');

    return {
      loadUser
    }
  },
  created() {
    if(this.$route.name !== 'Login') {
      this.loadUser();
    }
  }
}
</script>

