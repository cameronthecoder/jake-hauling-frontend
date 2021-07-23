<template>
  <div>
  <label
    :for="id"
    v-if="label"
    class="form-label font-body block mb-1 font-semibold text-gray-700"
    >{{ label }} <span v-if="required" class="text-red-600">*</span></label
  >
  <input
    :type="type"
    :id="id"
    @input="changeValue"
    :required="required"
    ref="input"
    v-bind="$attrs"
    class="
      px-6
      py-6
      font-body
      h-10
      shadow
      leading-normal
      block
      w-full
      focus:ring-primary-600
      focus:ring-2
      text-gray-800
      font-sans
      rounded-md
      text-left
      border-2
      border-gray-300
      appearance-none
      focus:outline-none
    "
    :class="{'border-red-400': errors.length}"
    :placeholder="placeholder"
  />
  <p class="text-gray-600 text-sm font-medium" v-if="help">{{help}}</p>
  </div>
</template>

<script>
export default {
    props: {
        modelValue: String,
        help: String,
        id: {
            type: String,
            default() {
                return `text-input`;
            }
        },
        required: {
          type: Boolean,
          defualt: false,
        },
        type: {
            type: String,
            default: "text"
        },
        value: String,
        label: String,
        placeholder: {
          type: String,
          defualt: ''
        },
        errors: {
            type: Array,
            default: () => []
        },
        withIcon: {
            type: Boolean,
            default: false
        },
        bordered: {
            type: Boolean,
            default: true
        }
    },
    emits: ['update:modelValue'],
    methods: {
      changeValue(event) {
        this.$emit('update:modelValue', event.target.value);
      }
    }
};
</script>

<style>
</style>