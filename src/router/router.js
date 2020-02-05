import Vue from 'vue'
import Router from 'vue-router'
import rootComponent from '../components/Root.vue'

Vue.use(Router)
export function createRouter() {
    return new Router({
        mode: 'history',
        routes: [
            {
                path: '/',
                component: rootComponent
            }
        ]
    })
}