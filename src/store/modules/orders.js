const state = {
    readyOrders: [],
    loading: {
        readyOrders: false
    }
};

const mutations = {
    SET_READY_ORDERS: (state, orders) => state.readyOrders = orders, 
    SET_READY_ORDERS_LOADING: (state, loading) => state.loading.readyOrders = loading,
};

const getters = {
    readyOrders: (state) => state.readyOrders
};

const actions = {
    async getReadyOrders({ commit }) {
        commit('SET_READY_ORDERS', {});
        commit('SET_READY_ORDERS_LOADING', true);
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
            commit('SET_READY_ORDERS_LOADING', false);
        }
    },
}
return {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}