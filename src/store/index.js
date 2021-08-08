import { createStore } from 'vuex'
import auth from './modules/auth'
import companies from './modules/companies'
import alerts from './modules/alerts'

const store = createStore({
    modules: {
        auth,
        companies,
        alerts
    }
})


export default store;