<template>
  <button :disabled="disabled" v-bind="$attrs" @click="$emit('click')" :class="[getColorClasses, getSizeClasses]" class="font-body focus:outline-none font-bold">
      <slot></slot>
  </button>
</template>

<script>
import { computed } from '@vue/runtime-core'
export default {
    props: {
        size: {
            type: String,
            default: 'big'
        },
        color: {
            type: String,
            default: 'primary'
        },
        loading: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    setup(props) {
        const getColorClasses = computed(() => {
            switch (props.color) {
                case "primary":
                    return "text-white bg-primary-600 hover:bg-primary-700 disabled:text-gray-800 focus:ring-4 focus:ring-primary-400"
                case "secondary":
                    return "text-primary-600 bg-gray-200 hover:bg-opacity-75 disabled:text-gray-800 focus:ring-4 focus:ring-gray-300"
                case "error" :
                    return "text-white bg-red-600 hover:bg-red-700 disabled:text-black-800 disabled:bg-red-800 focus:ring-4 focus:ring-red-400"
                default:
                    break;
            }
        })

        const getSizeClasses = computed(() => {
            switch (props.size) {
                case "big":
                    return "py-2 px-6 text-sm rounded-lg"
                case "small":
                    return "px-2 py-1 text-sm rounded-md"
                case "tiny": 
                    return "px-1 py-1 text-sm rounded-md"
                default:
                    break;
            }
        });

        return {
            getColorClasses,
            getSizeClasses
        }
    },
    emits: ['click'],

}
</script>

<style>

</style>