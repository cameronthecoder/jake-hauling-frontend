<template>
    <div class="p-4 rounded-md bg-red-600 text-white font-body" v-for="alert in alerts" :key="alert.message">
      <ExclamationIcon class="w-6 h-6 mr-2 inline-block" /> {{alert.message}}
    </div>
</template>

<script>
import { computed } from '@vue/runtime-core';
import { useStore } from 'vuex'
import {ExclamationIcon} from '@heroicons/vue/outline'
export default {
    components: {
        ExclamationIcon
    },
    setup() {
        const store = useStore();
        return {
            alerts: computed(() => store.getters['alerts/alerts'])
        }
    }
}
</script>

<style>

</style>