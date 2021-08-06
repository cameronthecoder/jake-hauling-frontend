import { createStore } from 'vuex'
import { VueCookieNext } from 'vue-cookie-next'
import axios from 'axios'
import router from '../router'
import auth from './modules/auth'




const store = createStore({
    state() {
        return {
            readyOrders: {},
            companies: [],
            errors: [],
        }
    },

    mutations: {
        ADD_ERROR: (state, error) => state.errors.push(error),
        SET_READY_ORDERS: (state, readyOrders) => state.readyOrders = readyOrders,
        SET_COMPANIES: (state, companies) => state.companies = companies
    },

    getters: {
        errors(state) {
            return state.errors;
        },
        readyOrders(state) {
            return state.readyOrders;
        },
        companies(state) {
            return state.companies
        },
    },

    actions: {
        async getReadyOrders({ commit }) {
            commit('SET_READY_ORDERS', {});
            try {
                const { data } = await axios.get('/api/orders/ready/', {
                    headers: {
                        'Authorization': `Bearer ${store.getters.token || token}`
                    }
                });
                commit('SET_READY_ORDERS', data);
            } catch (error) {
                console.log(error);
            } finally {
                // test
            }
        },

        async getCompanies({ commit }, payload) {
            try {
                let url = `/api/companies/?limit=${payload.limit}&page=${payload.page}`;
                if (payload.search) { url += `&searchTerm=${payload.search}` }
                const { data } = await axios.get(url, {
                    'Authorization': `Bearer ${store.getters.token || token}`
                });
                commit('SET_COMPANIES', data);
            } catch (error) {
                console.log(error);
            } finally {
                // test
            }
        },
    },
    modules: {
        auth
    }

})

export default store;