<template>
  <div class="w-full md:w-2/3">
          <form>
          <h1 class="text-4xl font-body mb-3">Create Order</h1>
          <p class="text-md font-medium font-body mb-3"><span class="text-red-400">*</span>  indicates a required field</p>
          <h1 class="text-lg font-body mb-3 text-gray-800 font-bold">General Information</h1>
              <div>
                  <label
                  for="company"
                  class="form-label font-body block mb-1 font-semibold text-gray-700"
                >Company <span class="text-red-600">*</span></label>
                <select required name="company" id="company" class="rounded-md font-body w-full shadow py-4 px-4 border-2 focus:outline-none border-gray-300 mb-6 focus:border-primary-600">
                  <option value="Select a company" selected disabled>Select a company</option>
                  <option v-for="company in results.companies" :key="company.id" :value="company.id">{{company.name}}</option>
                </select>
              </div>
              <div class="flex gap-4">
                <text-input id="order_number"  label="Order Number" class="w-2/3" v-model="order.order_number" type="number"  />
                <text-input id="batch_number" label="Batch Number" v-model="order.batch_number" help="This applies to JMX orders only." type="number"   />
                <text-input id="quote_price" label="Quote Price" v-model="order.quote_price" type="number" class="w-1/3"  />
              </div>
              <div class="flex gap-4 mt-4">
                <div class="w-2/3">
                  <label
                    for="status"
                    class="form-label font-body block mb-1 font-semibold text-gray-700"
                  >Status <span class="text-red-600">*</span></label>
                  <select required name="status" id="status" class="rounded-md font-body w-full shadow border-2 border-gray-300 py-6 px-6 focus:border-primary-600">
                    <option value="Loaded">Loaded</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Pending" selected>Pending</option>
                  </select>
                </div>
                <text-input id="estimated_delivery_date" class="h-auto"  label="Est. Delivery Date" v-model="order.estimated_delivery_date" type="date" />
                <text-input id="estiamted_ready_date" class="h-auto" label="Est. Ready Date" v-model="order.estimated_ready_date" type="date" />
              </div>
          </form>
            <h1 class="text-lg font-body mb-3 text-gray-800 font-bold mt-4">Customer Information</h1>
  </div>
</template>

<script>
import { reactive, ref } from '@vue/reactivity'
import TextInput from '../../components/TextInput.vue'
import { useStore } from 'vuex';
import { computed } from '@vue/runtime-core';
export default {
  components: { TextInput },
  setup() {
    const order = reactive({
      order_number: '',
      batch_number: '',
      quote_price: 0.00,
      estimated_delivery_date: '',
      estimated_ready_date: ''
    });

    const store = useStore();

    const getCompanies = () => store.dispatch("companies/getCompanies", {limit: -1, page: 1, search: ""});

      return {
          order,
          getCompanies,
          results: computed(() => store.state.companies.companies),
      }
  },
  created() {
    this.getCompanies();
  }

}
</script>

<style>

</style>