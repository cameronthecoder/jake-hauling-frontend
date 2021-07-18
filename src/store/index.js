import { createStore } from 'vuex'
import { VueCookieNext } from 'vue-cookie-next'
import axios from 'axios'
import router from '../router'

let baseURL = 'http://192.168.0.108:8008/'

const instance = axios.create({
    withCredentials: true,
    baseURL: baseURL,
})


const store = createStore({
    state() {
        return {
            token: null || VueCookieNext.getCookie("access_token"),
            user: null,
            loading: false,
            readyOrders: {},
            companies: []
        }
    },

    mutations: {
        SET_TOKEN: (state, token) => state.token = token,
        SET_USER: (state, user) => state.user = user,
        SET_READY_ORDERS: (state, readyOrders) => state.readyOrders = readyOrders,
        SET_LOADING: (state, loading) => state.loading = loading,
        SET_COMPANIES: (state, companies) => state.companies = companies
    },

    getters: {
        user(state) {
            return state.user;
        },
        readyOrders(state) {
            return state.readyOrders;
        },
        companies(state) {
            return state.companies
        },
        token(state) {
            return state.token;
        },
        loading(state) {
            return state.loading;
        },
        isAuthenticated(state) {
            return state.token !== null;
        }
    },

    actions: {
        async login({ commit, dispatch }, user) {
            try {
                const { data } = await instance.post('/api/auth/token/', `grant_type=password&username=${user.username}&password=${user.password}`, {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                });
                // set cookie to secure=true and httpOnly=true !!!
                VueCookieNext.setCookie('access_token', data.access_token);
                commit('SET_TOKEN', data.access_token);
                await dispatch('loadUser', data.access_token);
                router.push({ 'name': 'Admin' });
            } catch (error) {
                console.log('error while trying to login');
                console.log(error);

            }

        },

        async authorize({ getters }) {
            if (getters.isAuthenticated) {
                try {
                    const { data } = await instance.get('/api/oauth/');
                    window.location.replace(data.authorization_url);
                } catch (error) {
                    console.log(error);
                }
            }
        },

        async loadUser({ getters, commit, dispatch }, token) {
            if (getters.isAuthenticated) {
                console.log(store.getters.token);
                try {
                    const { data } = await instance.get('/api/auth/me/', {
                        headers: {
                            'Authorization': `Bearer ${store.getters.token || token}`
                        }
                    });
                    commit('SET_USER', data);
                } catch (error) {
                    console.log(error);
                    if (error.request.status == 401) {
                        dispatch('logout');
                    }
                }
            }
        },

        logout({ getters, commit }) {
            if (getters.isAuthenticated) {
                commit('SET_USER', null);
                commit('SET_TOKEN', null);
                VueCookieNext.removeCookie('access_token', null);
                router.push({ 'name': 'Login' })
            }
        },

        async getReadyOrders({ commit }) {
            commit('SET_LOADING', true);
            commit('SET_READY_ORDERS', {});
            try {
                const { data } = await instance.get('/api/orders/ready/', {
                    headers: {
                        'Authorization': `Bearer ${store.getters.token || token}`
                    }
                });
                commit('SET_READY_ORDERS', data);
            } catch (error) {
                console.log(error);
            } finally {
                commit('SET_LOADING', false);
            }
        },

        async getCompanies({ commit }, payload) {
            commit('SET_LOADING', true);
            try {
                const { data } = await instance.get(`/api/companies/?limit=${payload.limit}&page=${payload.page}&searchTerm=${payload.search}`, {
                    headers: {
                        'Authorization': `Bearer ${store.getters.token || token}`
                    }
                });
                commit('SET_COMPANIES', data);
            } catch (error) {
                console.log(error);
            } finally {
                commit('SET_LOADING', false);
            }
        },
    }

})

console.log('is auth', store.getters.isAuthenticated);
if (store.getters.isAuthenticated) {
    instance.defaults.headers.common = { 'Authorization': `Bearer ${store.getters.token}` }
}

export default store;