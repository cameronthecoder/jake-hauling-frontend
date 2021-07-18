import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { VueCookieNext } from 'vue-cookie-next'
import './index.css'

let app = createApp(App);
app.use(VueCookieNext);

app.use(store);
app.use(router);

app.mount('#app');