<template>
  <div class="bg-white w-full rounded-2xl shadow p-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-5xl font-body">{{ data }}</h1>
        <p class="font-medium font-body text-gray-500">{{ label }}</p>
      </div>
      <div
        class="bg-opacity-30 rounded-full p-3"
        :class="'bg-' + color + '-400' + ' text-' + color + '-500'"
      >
        <slot>
          <CheckCircleIcon class="w-6 h-6" />
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
import { CheckCircleIcon } from "@heroicons/vue/outline";
export default {
  props: {
    data: String,
    label: String,
    color: {
        default: 'primary',
        type: String
    }
  },
  components: {
      CheckCircleIcon
  }
};
</script>

<style>
</style>