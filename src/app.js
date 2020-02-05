import Vue from 'vue'
import {createRouter} from './router/router'
import App from './App.vue'
// import ElementUi from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css';

// Vue.use(ElementUi)
export function createApp() {
    const router = createRouter()
    const app = new Vue({
        router,
        render: h => h(App)
    })
    return {router, app}
}