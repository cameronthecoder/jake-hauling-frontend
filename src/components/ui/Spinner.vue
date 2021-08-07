<template>
  <img src="/tail-spin.svg" :class="getSizeClasses" alt="" />
</template>

<script>
import { computed } from '@vue/runtime-core'
export default {
    props: {
        size: {
            type: String,
            default: "small"
        }
    },
    setup(props) {
        const getSizeClasses = computed(() => {
            switch (props.size) {
                case "small":
                    return "w-6 h-6"
                case "medium":
                    return "w-12 h-12"
                case "large":
                    return "w-24 h-24"
                case "xl":
                    return "h-36 h-36"
                default:
                    break;
            }
        });

        return {
            getSizeClasses
        }
    }
}
</script>

<style>

</style>