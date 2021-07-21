<template>
  <router-view />
</template>

<script>
import { useStore } from 'vuex'
import {useRouter} from 'vue-router'
export default {
  setup() {
    const store = useStore();
    const loadUser = () => store.dispatch('loadUser');

    return {
      loadUser
    }
  },
  created() {
    console.log(this.$route.name);
    if(this.$route.name !== 'Login') {
      console.log(this.$route.name == 'Login');
      console.log('we are loading the user from the main app');
      this.loadUser();
    }
  }
}
</script>

