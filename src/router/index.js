import { createWebHashHistory, createRouter } from "vue-router";
import Shell from "../views/admin/Shell.vue";
import Dashboard from "../views/admin/Dashboard.vue";
import Companies from "../views/admin/Companies.vue";
import CreateOrder from "../views/admin/CreateOrder.vue";
import UIExplorer from "../views/admin/UIExplorer.vue";
import Login from "../views/Login.vue";
import store from '../store'

const isAuthenticated = () => {
    return store.getters['auth/isAuthenticated'];
}



const routes = [{
        path: "/admin",
        name: "Admin",
        redirect: "/admin/home/",
        meta: { requiresAuth: true, title: "Admin" },
        component: Shell,
        children: [{
                path: 'home',
                meta: {
                    title: "Dashboard"
                },
                name: 'admin_home',
                component: Dashboard
            },
            {
                path: 'companies',
                name: 'admin_companies',
                meta: {
                    title: "Companies"
                },
                component: Companies
            },
            {
                path: 'ui',
                name: 'admin_ui',
                meta: {
                    title: "Admin UI Components"
                },
                component: UIExplorer
            },
            {
                path: 'orders/create',
                name: 'admin_create_order',
                meta: {
                    title: "Create Order"
                },
                component: CreateOrder
            },
        ]
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
        meta: {
            title: "Login"
        }
    },


];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !isAuthenticated()) next({ name: 'Login' })
    else {
        document.title = `${to.meta.title} - JAKE HAULING LLC`
        next()
    }
})

export default router;