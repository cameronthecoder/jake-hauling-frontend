const state = {
    loading: {
        companies: false
    },
    companies: [],
};

const mutations = {
    SET_COMPANIES: (state, companies) => state.companies = companies
};

const getters = {
    companies: (state) => state.companies,
    loading: (state) => state.loading
};

const actions = {
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
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions

}