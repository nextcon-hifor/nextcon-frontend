import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { createHead } from "@vueuse/head";
import SocketPlugin from "./plugins/socket.js";
// Bootstrap 및 BootstrapVue Next Import
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "@fortawesome/fontawesome-free/css/all.css";
import "@/css/global.css";

const app = createApp(App);
const head = createHead();

app.use(router);
app.use(store);
app.use(head); // ✅ Head 플러그인 사용
app.use(SocketPlugin);
app.mount("#app");
