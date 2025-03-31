import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import store from './store';

// Bootstrap 및 BootstrapVue Next Import
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import '@fortawesome/fontawesome-free/css/all.css';
import '@/css/global.css';

createApp(App)
    .use(router)
    .use(store)
    .mount('#app')
