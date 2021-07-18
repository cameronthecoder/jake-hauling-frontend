<template>
      <nav class="navbar navbar-expand navbar-light navbar-bg">
        <a class="sidebar-toggle js-sidebar-toggle">
          <i class="hamburger align-self-center"></i>
        </a>

        <div class="navbar-collapse collapse">
          <ul class="navbar-nav navbar-align">
            <li class="nav-item dropdown" v-if="user">
              <a
                class="nav-icon dropdown-toggle d-inline-block d-sm-none"
                href="#"
                data-bs-toggle="dropdown"
              >
                <i class="align-middle" data-feather="settings"></i>
              </a>

              <a
                class="nav-link dropdown-toggle d-none d-sm-inline-block"
                href="#"
                data-bs-toggle="dropdown"
              >
                <span class="text-dark">{{user.first_name}} {{user.last_name}}</span>
              </a>
              <div class="dropdown-menu dropdown-menu-end">
                <a class="dropdown-item" href="pages-settings.html"
                  ><i class="align-middle me-1" data-feather="settings"></i>
                  Settings & Privacy</a
                >
                <div class="dropdown-divider"></div>
                <button class="dropdown-item" @click="logout">Log out</button>
              </div>
            </li>
          </ul>
        </div>
      </nav>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
export default {
    setup() {
        const store = useStore();
        return {
            user: computed(() => store.getters.user),
            logout: () => store.dispatch('logout')
        }
    }
}
</script>

<style>

</style>