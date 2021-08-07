import { VueCookieNext } from 'vue-cookie-next';
import router from '../../router';
import AuthenticationService from '../../services/auth'
const state = {
    token: null || VueCookieNext.getCookie("access_token"),
    user: null,
    loading: {
        login: false,
        user: false,
        authenticateWithIntuit: false
    },
};

const mutations = {
    SET_TOKEN: (state, token) => state.token = token,
    SET_LOGIN_LOADING: (state, loading) => state.loading.login = loading,
    SET_USER_LOADING: (state, loading) => state.loading.user = loading,
    SET_USER: (state, user) => state.user = user,
};

const getters = {
    user: (state) => state.user,
    token: (state) => state.token,
    loading: (state) => state.loading,
    isAuthenticated: (state) => state.token !== null,
    userLoading: (state) => state.userLoading
};

const actions = {
    async login({ commit, dispatch }, user) {
        commit('SET_LOGIN_LOADING', true);
        const [data, error] = await AuthenticationService.authenticate(user);
        if (data) {
            VueCookieNext.setCookie('access_token', data.access_token, { expire: '60m' });
            commit('SET_TOKEN', data.access_token);
            await dispatch('loadUser');
            router.push({ 'name': 'Admin' });
            commit('CLEAR_ERRORS');
        } else {
            commit('CLEAR_ERRORS');
            if (typeof error.request != null) {
                if (error.request.status == 401) {
                    commit('ADD_ERROR', { 'message': `Invalid username or password.` })
                } else {
                    commit('ADD_ERROR', { 'message': `An unexpected error has occurred. Please try again later.` })
                }
            }
        }
        commit('SET_LOGIN_LOADING', false);
    },

    async authorize() {
        const [data, error] = await AuthenticationService.authenticateWithIntuit();
        if (data) {
            window.location.replace(data.authorization_url);
        } else {
            commit('ADD_ERROR', { 'message': `An error has occurred.` })
        }
    },

    async loadUser({ getters, commit, dispatch }) {
        if (getters.isAuthenticated) {
            commit('SET_USER_LOADING', true);
            const [data, error] = await AuthenticationService.loadUser();
            console.log(error);
            if (data) {
                commit('SET_USER', data);
            } else {
                if (error.request.status == 401) {
                    commit('ADD_ERROR', { 'message': 'Your session as expired. Please login again.' })
                    dispatch('logout');
                } else {
                    commit('ADD_ERROR', { 'message': `${error.request.status} An unexpected error has occurred. Please try again later.` })
                }
                console.log(error);
            }
            commit('SET_USER_LOADING', false);
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
};


export default {
    state,
    getters,
    actions,
    mutations
}