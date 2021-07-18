<template>
  <li class="sidebar-item active">
    <router-link class="sidebar-link" :to="to">
      <i class="align-middle" data-feather="sliders"></i>
      <span class="align-middle">Dashboard</span>
    </router-link>
  </li>
</template>

<script>
export default {
    name: "SidebarItem",
    props: [
        {
            to: Object,
            name: String
        }
    ]
};
</script>

<style>
</style>