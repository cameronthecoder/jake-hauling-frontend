<template>
  <transition
    enter-active-class="transition-all transition-fatest east-out-quad"
    leave-active-class="transition-all transition-fatest east-in-quad"
    enter-class="opacity-0 scale-70"
    enter-to-class="opacity-100 scale-100"
    leave-class="opacity-100 scale-100"
    leave-to-class="opacity-0 scale-70"
  >
    <div
      v-show="show"
      class="
        bg-white
        absolute
        h-100
        w-100
        flex
        top-0
        right-0
        left-0
        bottom-0
        z-20
        bg-opacity-70
        items-center
        justify-center
      "
    >
      <spinner size="xl"></spinner>
    </div>
  </transition>
</template>

<script>
import Spinner from "./ui/Spinner.vue";
export default {
  components: { Spinner },
  props: {
      show: {
          type: Boolean,
          default: false
      }
  }
};
</script>

<style>
</style>