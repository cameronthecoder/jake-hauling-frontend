import { createWebHistory, createRouter } from "vue-router";
import Shell from "../views/admin/Shell.vue";
import Dashboard from "../views/admin/Dashboard.vue";
import Companies from "../views/admin/Companies.vue";
import CreateOrder from "../views/admin/CreateOrder.vue";
import Login from "../views/Login.vue";
import store from '../store'

const isAuthenticated = () => {
    return store.getters.isAuthenticated;
}



const routes = [{
        path: "/admin",
        name: "Admin",
        redirect: "/admin/home/",
        meta: { requiresAuth: true },
        component: Shell,
        children: [{
                path: 'home',
                name: 'admin_home',
                component: Dashboard
            },
            {
                path: 'companies',
                name: 'admin_companies',
                component: Companies
            },
            {
                path: 'create_order',
                name: 'admin_create_order',
                component: CreateOrder
            },
        ]
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
    },


];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    console.log(isAuthenticated());
    if (to.meta.requiresAuth && !isAuthenticated()) next({ name: 'Login' })
    else next()
})

export default router;