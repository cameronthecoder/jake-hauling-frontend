const state = {
    alerts: [],
};

const mutations = {
    ADD_ALERT: (state, alert) => state.alerts.push(alert),
    CLEAR_ALERTS: (state) => state.alerts = [],
};

const getters = {
    alerts: (state) => state.alerts,
};

export default {
    namespaced: true,
    state,
    getters,
    mutations
}