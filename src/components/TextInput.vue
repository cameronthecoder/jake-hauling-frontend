<template>
  <div>
  <label
    :for="id"
    v-if="label"
    class="form-label block mb-1 font-semibold text-gray-700"
    >{{ label }} <span v-if="required" class="text-red-600">*</span></label
  >
  <input
    :type="type"
    :id="id"
    ref="input"
    v-bind="$attrs"
    class="
      px-2
      py-2
      h-10
      leading-normal
      block
      w-full
      focus:ring-primary-600
      focus:ring-2
      text-gray-800
      bg-white  
      font-sans
      rounded-md
      text-left
      appearance-none
      focus:outline-none
    "
    :class="{'border-red-400': errors.length}"
    :modelValue="value"
    @input="onChanged"
    :placeholder="placeholder"
    :value="modelValue"
  />
  <p class="text-gray-600 text-sm font-medium" v-if="help">{{help}}</p>
  </div>
</template>

<script>
export default {
    emits: ['update:modelValue'],
    props: {
        modelString: String,
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
    setup(props, {emit}) {
        const onChanged = (e) => {
          emit('update:modelValue', e.currentTarget.value);
        }

        return {
          onChanged
        }
    }
};
</script>

<style>
</style>