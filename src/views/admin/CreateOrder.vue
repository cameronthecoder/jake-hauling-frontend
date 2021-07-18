<template>
  <h1 class="text-4xl font-body mb-3">Create Order</h1>
  <p class="text-md font-medium mb-3"><span class="text-red-400">*</span>  indicates a required field</p>
  <h1 class="text-lg font-body mb-3 text-gray-400 font-medium">Company</h1>
  <div class="rounded-md shadow-md p-6 mb-4">
<button class="bg-primary-600 focus:outline-none font-body focus:ring-2 focus:ring-primary-300 mt-3 hover:bg-primary-700 text-white text-center rounded-md px-2 py-4">Select Company</button>
  </div>
  <h1 class="text-lg font-body mb-3 text-gray-400 font-medium">General Information</h1>
  <div class="flex gap-4 flex-col md:flex-row shadow-md rounded-md p-5">
      <div class="md:w-2/3">
        <div class="flex gap-4">
          <text-input label="Order Number" class="w-2/3" modelValue="order_number" type="number"  v-model="order.order_number" />
          <text-input label="Batch Number" modelValue="batch_number" help="This applies to JMX orders only." type="number" class="w-1/3"  v-model="order.batch_number" />
          <text-input label="Quote Price" type="number" modelValue="quote_price"  v-model="order.quote_price" />
        </div>
      </div>
      <div class="flex-1"></div>
  </div>
</template>

<script>
import { reactive, ref } from '@vue/reactivity'
import TextInput from '../../components/TextInput.vue'
export default {
  components: { TextInput },
  setup() {
      const order = reactive({
          order_number: null,
          batch_number: null,
          quote_price: 0.00
      });

      const test = () => {
          console.log('dsfdsfsdf');
      }

      return {
          order,
          test
      }
  }

}
</script>

<style>

</style>