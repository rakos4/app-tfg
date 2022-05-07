
import { createApp } from 'vue'
import {createRouter, createWebHistory} from "vue-router";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue-3';
import rootComponent from './component/rootComponent.vue';
import login from '../app/component/login.vue';
import dashboard from '../app/component/dashboard.vue';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
const routes = [
    {
        path: '/login',
        name: 'login',
        component: login
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: dashboard
    },

]

const router = createRouter({

    history: createWebHistory(),
    routes,
})


const app = createApp(rootComponent)
app.use(router)
app.use(BootstrapVue)
app.use(IconsPlugin)
app.mount("#app")




