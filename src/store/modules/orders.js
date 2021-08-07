const state = {};

const mutations = {};

const getters = {};

const actions = {
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
}
return {
    state,
    getters,
    mutations,
    actions
}