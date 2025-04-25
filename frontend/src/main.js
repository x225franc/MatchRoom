import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import authService from "./services/authService";
import axios from "axios";

import "./assets/tailwind.css";

const token = localStorage.getItem("authToken");
if (token) {
	axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

const app = createApp(App);

router.beforeEach((to, from, next) => {
	document.title = to.meta.title || "matchroom"; 
	next();
});

authService.setupInterceptors(router);

app.use(router);
app.mount("#app");

if ("serviceWorker" in navigator) {
	window.addEventListener("load", () => {
		navigator.serviceWorker.register("/serviceworker.js");
	});
}
