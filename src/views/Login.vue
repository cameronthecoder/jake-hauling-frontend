<template>
<div class="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
  <div class="shadow-md relative rel max-w-4xl w-full h-96 rounded">
         <div
         v-show="loading.login || loading.user"
  class="
  bg-white
  w-full
  flex
  absolute
  bg-opacity-75
  bottom-0
  right-0
  left-0
  top-0
  h-96
  items-center
  justify-center
"
>
<img src="tail-spin.svg" class="h-32" alt="" />
    </div>
    <div class="flex h-full flex-col md:flex-row">
      <div class="md:w-1/2 w-full h-100 p-6 bg-primary-600">
        <h1 class="text-xl font-bold font-body text-white">Login to Jake Hauling LLC</h1>
        <p class="text-base font-body text-white mt-4">With the Jake Hauling LLC OMS, you can manage orders, invoices, routes, and more.</p>

        <div v-if="user" class="rounded shadow mt-4 gap-4 bg-white p-6 flex items-center">
          <div>
           <img v-if="user" :src="`https://ui-avatars.com/api/?name=${user.first_name}+${user.last_name}&bold=true`" class="w-12 h-12 md:block object-cover rounded-full mx-auto" alt="" />
           </div>
           <section>
             <h1 class="text-lg font-body font-bold">{{user.first_name}} {{user.last_name}}</h1>
             <h2 class="text-base text-gray-400 font-body">is already logged in. Not you?</h2>
           </section>
        </div>
      </div>
      <div class="flex-1 bg-white p-6">
        <form @submit.prevent="login" class="block w-full">
          <alerts />
          <text-input label="Username" id="username" class="mb-4" placeholder="Username" v-model="username" /> 
          <text-input label="Password" id="password" placeholder="Password" type="password" v-model="password" />
          <div class="flex mt-4 gap-2">
              <ui-button type="submit" color="primary" class="w-1/2" size="big">Login</ui-button> 
              <ui-button type="button" color="secondary" class="w-1/2" size="small">Forgot Password</ui-button> 
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
<div class="relative text-center">
  <p class="absolute bottom-0 right-0 left-0 font-body text-sm mb-4">Copyright 2021 Cameron Dahl. All rights reserved.</p>
</div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { useStore } from 'vuex'
import { computed } from '@vue/runtime-core';
import Alerts from '../components/Alerts.vue';
import TextInput from '../components/TextInput.vue';
import UiButton from '../components/ui/uiButton.vue';
export default {
  components: {
    Alerts,
    TextInput,
    UiButton
  },
  setup() {
    const username = ref("");
    const password = ref("");

    const store = useStore();

    return {
      username,
      password,
      isAuthenticated: computed(() => store.getters.isAuthenticated),
      loading: computed(() => store.getters.loading),
      user: computed(() => store.getters.user),
      login: () => store.dispatch('login', {'username': username.value, 'password': password.value}),
    };
  },
};
</script>

<style>
</style>