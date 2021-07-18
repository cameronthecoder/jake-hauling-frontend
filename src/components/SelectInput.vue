<template>
  <div>
    <label
        :for="id"
        v-if="label"
        class="form-label block mb-1 font-semibold text-gray-700"
        >{{ label }}</label
    >
    <select 
        type=""
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
        :value="modelValue">

        <option value=""></option>
        </select>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>