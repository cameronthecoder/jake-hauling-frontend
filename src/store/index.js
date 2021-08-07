import { createStore } from 'vuex'
import auth from './modules/auth'
import companies from './modules/companies'

const store = createStore({
    state() {
        return {
            readyOrders: {},
            errors: [],
        }
    },

    mutations: {
        ADD_ERROR: (state, error) =>
            state.errors.push(error),
        CLEAR_ERRORS: (state) => state.errors = [],
        SET_READY_ORDERS: (state, readyOrders) => state.readyOrders = readyOrders,
    },

    getters: {
        errors(state) {
            return state.errors;
        },
        readyOrders(state) {
            return state.readyOrders;
        },
    },
    modules: {
        auth,
        companies
    }
})


export default store;