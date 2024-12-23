import { createApp } from "vue";

import { createRouter, createWebHistory } from "vue-router";

import App from "./App.vue";
import Main from "./components/Main.vue";
import About from "./views/AboutView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "MainApp", component: Main },
    { path: "/about", name: "About", component: About },
  ],
});

const app = createApp(App);

app.use(router).mount("#app");
