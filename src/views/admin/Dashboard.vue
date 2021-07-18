<template>
<div class="flex flex-col md:flex-row gap-4">
    <div class="md:w-2/3">
        <h1 class="text-4xl font-body" v-if="user">Good afternoon, {{user.first_name}}</h1>
        <h2 class="text-lg text-gray-400 font-medium mt-3 font-body">Orders expected to be ready this week (7/11)</h2>
        <img src="../../assets/tail-spin.svg" class="h-20 m-auto" v-if="loading" alt="">
        <div class="rounded-md p-6 shadow-lg mb-4" v-for="(value, company) in readyOrders" :key="company">
            <h1 class="text-xl font-body">{{company}} <span class="bg-gray-300 text-gray-800 px-2 rounded-full bg-opacity-70 uppercase font-bold tracking-wider font-body">
                                {{value.length}}
                            </span></h1>
            <div class="md:ml-6 mt-6">
                <div v-for="order in value" :key="order.id">
                    <div class="flex items-center md:justify-between mb-4">
                        <div class="flex items-center gap-4">
                            <div class="bg-primary-600 bg-opacity-70 border-4 border-gray-200 rounded-full h-6 w-6"></div>
                            <div>
                                <h1 class="text-lg font-medium font-body text-primary-600 cursor-pointer">{{order.order_number || order.delivery_address.to_from}}</h1>
                                <h1 class="text-lg font-medium font-body text-gray-400">{{order.delivery_address.city}}, {{order.delivery_address.state}} {{order.delivery_address.zip}}</h1>
                                <span class="bg-green-300 inline-block md:hidden text-green-800 py-1 px-2 rounded-full bg-opacity-70 uppercase font-bold tracking-wider font-display">
                                    {{order.status}}
                                </span>
                            </div>
                        </div>
                        <div class="gap-4 ml-4 hidden md:flex">
                            <div class="bg-green-300 text-green-800 py-1 px-2 rounded-full bg-opacity-70 uppercase font-bold tracking-wider font-display">
                                {{order.status}}
                            </div>
                            <div class="bg-gray-200 text-gray-400 py-1 px-2 rounded-full bg-opacity-70 uppercase font-bold tracking-wider font-body">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
</svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <p class="text-center font-body text-lg mt-5" v-if="!readyOrders.length"><CheckCircleIcon class="text-green-600 h-6 w-6 inline-block" /> There are no orders that are expected to be ready.</p>

        <div class="flex flex-col items-center my-12">
    <div class="flex text-gray-700">
        <div class="h-8 w-8 mr-1 flex justify-center items-center rounded-full bg-gray-200 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-left w-4 h-4">
                <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
        </div>
        <div class="flex h-8 font-medium rounded-full bg-gray-200" v-for="page in Object.keys(readyOrders).length" :key="page">
            <div class="w-8 md:flex justify-center items-center hidden  cursor-pointer leading-5 transition duration-150 ease-in  rounded-full" :class="{'bg-primary-600 text-white': page == currentPage}">{{page}}</div>
        </div>
        <div class="h-8 w-8 ml-1 flex justify-center items-center rounded-full bg-gray-200 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-right w-4 h-4">
                <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
        </div>
    </div>
</div>
    </div>

        <div class="flex-1">
            <h1 class="text-4xl font-body mb-3">Quick Actions</h1>
            <router-link :to="{'name':'admin_create_order'}" class="bg-primary-600 focus:outline-none font-medium font-body focus:ring-2 focus:ring-primary-300 hover:bg-primary-700 text-white w-full text-center rounded-md py-4 block">Create Order</router-link>
            <button class="bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-300 mt-3 hover:bg-primary-700 text-white w-full text-center rounded-md py-4">Find Order</button>
        </div>
    </div>

</template>

<script>
import TextInput from '../../components/TextInput.vue'
import {onMounted, computed, ref} from 'vue'
import {useStore} from 'vuex'
import {CheckCircleIcon} from '@heroicons/vue/outline'
export default {
    components: {
        TextInput, CheckCircleIcon
    },

    setup() {
        const store = useStore();
        const currentPage = ref(1);

        const getReadyOrders = () => store.dispatch('getReadyOrders');


        return {
            readyOrders: computed(() => store.getters.readyOrders),
            loading: computed(() => store.getters.loading),
            user: computed(() => store.getters.user),
            currentPage,
            getReadyOrders
        }
    },
    created() {
        this.getReadyOrders();
    },
    computed: {
        name(fullName) {
            return fullName;
        }
    }
}
</script>

<style>

</style>