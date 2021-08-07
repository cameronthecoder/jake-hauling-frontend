<template>
<div class="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
  <div class="shadow-lg relative max-w-4xl rounded overflow-auto">
    <login-overlay :show="loading.login || loading.user"></login-overlay>
    <div class="flex h-full flex-col md:flex-row">
      <div class="md:w-1/2 w-full h-100 p-6 bg-primary-600">
        <h1 class="text-xl font-bold font-body text-white">Login to Jake Hauling LLC</h1>
        <p class="text-base font-body text-white mt-4">With the Jake Hauling LLC OMS, you can manage orders, invoices, routes, and more.</p>

        <div v-if="user" class="rounded shadow mt-4 md:mt-12 gap-4 bg-white p-6 flex items-center">
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
          <div class="flex flex-col gap-4">
            <text-input :disabled="loading.login" :required="true" label="Username" id="username" placeholder="Username" v-model="username" /> 
            <text-input :disabled="loading.login" :required="true" label="Password" id="password" placeholder="Password" type="password" v-model="password" />
          </div>
          <div class="flex mt-4 gap-2">
              <ui-button type="submit" :disabled="loading.login" color="primary" class="w-1/2" size="big">Login</ui-button> 
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
import LoginOverlay from '../components/LoginOverlay.vue';
import UiButton from '../components/ui/uiButton.vue';
export default {
  components: {
    Alerts,
    TextInput,
    UiButton,
    LoginOverlay
  },
  setup() {
    const username = ref("");
    const password = ref("");

    const store = useStore();

    return {
      username,
      password,
      isAuthenticated: computed(() => store.getters.isAuthenticated),
      loading: computed(() => store.state.auth.loading),
      user: computed(() => store.getters.user),
      login: () => store.dispatch('login', {'username': username.value, 'password': password.value}),
    };
  },
};
</script>

<style>
</style>