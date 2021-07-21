<template>
<div class="min-h-screen flex items-center justify-center bg-primary-600 py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-md w-full space-y-8 p-6 shadow-md bg-white rounded-md">
    <div>
      <img src="/truck.svg" class="h-16 w-16 m-auto" alt="">
      <h2 class="mt-6 text-center text-3xl font-bold text-gray-900 font-display">
        Login to Jake Hauling LLC
      </h2>
      <h2 class="text-center mt-3 text-sm font-bold text-gray-300 font-display">
        Please login with the email and password provided. If you did not receive one, contact the IT department.
      </h2>
    </div>
    <p class="text-center font-body font-bold text-xl" v-if="isAuthenticated">It looks like you are already logged in.</p>
    <alerts />
    <form class="mt-8 space-y-6" @submit.prevent="login">
      <input type="hidden" name="remember" value="true">
      <div class="rounded-md shadow-sm -space-y-px">
        <div>
          <label for="email-address" class="sr-only">Email address</label>
          <input id="email-address" v-model="username"  type="email" autocomplete="email" required class="appearance-none rounded-none font-body relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm" placeholder="Email address">
        </div>
        <div>
          <label for="password" class="sr-only">Password</label>
          <input id="password" v-model="password" type="password" autocomplete="current-password" required class="appearance-none font-body rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm" placeholder="Password">
        </div>
      </div>

      <div class="text-center">
        <div class="text-sm">
          <a href="#" class="font-medium text-primary-600 hover:text-primary-500">
            Forgot your password?
          </a>
        </div>
      </div>

      <div>
        <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
          <span class="absolute left-0 inset-y-0 flex items-center pl-3">
            <!-- Heroicon name: solid/lock-closed -->
            <svg class="h-5 w-5 text-primary-500 group-hover:text-primary-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
            </svg>
          </span>
          Sign in
        </button>
      </div>
    </form>
  </div>
</div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { useStore } from 'vuex'
import { computed } from '@vue/runtime-core';
import Alerts from '../components/Alerts.vue';
export default {
  components: {
    Alerts
  },
  setup() {
    const username = ref("");
    const password = ref("");

    const store = useStore();

    return {
      username,
      password,
      isAuthenticated: computed(() => store.getters.isAuthenticated),
      login: () => store.dispatch('login', {'username': username.value, 'password': password.value}),
    };
  },
};
</script>

<style>
</style>