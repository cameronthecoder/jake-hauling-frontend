<template>
  <div class="bg-white overflow-x-auto text-white border-r-2 flex-row md:h-screen relative h-14 md:w-28 flex md:flex-col items-center md:gap-6 p-3 gap-4 justify-between">
    <img v-if="user" :src="`https://ui-avatars.com/api/?name=${user.first_name}+${user.last_name}&bold=true`" class="w-12 h-12 hidden md:block object-cover rounded-full mx-auto" alt="" />

    <div class="flex flex-row md:flex-col items-center gap-4 md:gap-12">
      <div class="text-gray-700">
        <InboxIcon class="h-10 w-10 cursor-pointer" :class="{'bg-primary-600': this.$route.name == 'admin_orders' }" />
      </div>
      <router-link to="/admin/home/" active-class="bg-primary-600 p-3 rounded-2xl">
        <HomeIcon class="h-8 w-8 cursor-pointer" :class="{'text-white': this.$route.name == 'admin_home' }" />
      </router-link>
      <router-link to="/admin/companies/">
        <OfficeBuildingIcon class="h-8 w-8 text-gray-700 hover:text-gray-300 cursor-pointer" :class="{'text-primary-500': this.$route.name == 'admin_companies' }" />
      </router-link>
    </div>

    <div class="flex flex-row md:flex-col items-center gap-2 md:gap-12">
      <CogIcon class="h-8 w-8 text-gray-700 hover:text-gray-300 cursor-pointer" :class="{'text-primary-600': this.$route.name == 'admin_settings' }" />
      <button @click="logout">
      <LogoutIcon class="h-8 w-8 text-gray-700 hover:text-gray-300 cursor-pointer" />
      </button>
    </div>
  </div>
</template>

<script>
import {useStore} from 'vuex'
import {computed} from 'vue'
import { HomeIcon, InboxIcon, CogIcon, LogoutIcon, OfficeBuildingIcon } from '@heroicons/vue/outline'
export default {
    name: 'Sidebar',
    components: {
      HomeIcon, InboxIcon, CogIcon, LogoutIcon, OfficeBuildingIcon
    },
    setup() {
        const store = useStore();
        return {
            user: computed(() => store.getters['auth/user']),
            logout: () => store.dispatch('auth/logout')
        }
    }
}
</script>

<style>

</style>