import './assets/main.css'
import axios from 'axios'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App)

app.use(router).use(store)

app.mount('#app')

// Axios config
axios.defaults.headers.common['Content-Type'] = 'application/merge-patch+json';
axios.defaults.headers.post['Content-Type'] = 'application/ld+json'

// PROD
axios.defaults.baseURL = 'https://intranet.whowins.fun/';
