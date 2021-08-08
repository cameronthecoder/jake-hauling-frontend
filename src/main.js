import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { VueCookieNext } from 'vue-cookie-next'
import './index.css'
import vueDebounce from 'vue-debounce'
import axios from 'axios'

let baseURL = 'http://localhost:8008/'
axios.defaults.baseURL = baseURL;
axios.interceptors.request.use((config) => {
    if (store.getters.isAuthenticated) {
        config.headers.Authorization = `Bearer ${store.getters.token}`;
    }
    return config;
})

let app = createApp(App);
app.use(VueCookieNext);
app.use(vueDebounce)
app.use(store);
app.use(router);

app.mount('#app');