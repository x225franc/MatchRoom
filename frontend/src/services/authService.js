import axios from "axios";
import Cookies from "js-cookie";

const BACKEND_URL = window.config.BACKEND_URL;

export default {
	async register(userData) {
		return axios.post(`${BACKEND_URL}/auth/register`, userData);
	},

	async login(credentials) {
		return axios.post(`${BACKEND_URL}/auth/login`, credentials);
	},

	async verify2FA(userId, token) {
		return axios.post(`${BACKEND_URL}/auth/2fa/verify`, { userId, token });
	},

	async setup2FA() {
		return axios.post(`${BACKEND_URL}/auth/2fa/setup`);
	},

	async logout() {
		return axios.post(`${BACKEND_URL}/auth/logout`);
	},

	saveToken(token, remember = false) {
		if (remember) {
			Cookies.set("authToken", token, { expires: 7 }); // 7 jours
		} else {
			sessionStorage.setItem("authToken", token);
		}
		axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
	},

	getToken() {
		return Cookies.get("authToken") || sessionStorage.getItem("authToken");
	},

	removeToken() {
		Cookies.remove("authToken");
		sessionStorage.removeItem("authToken");
		delete axios.defaults.headers.common["Authorization"];
	},

	isAuthenticated() {
		return !!this.getToken();
	},

	// Protection des routes nécessitant une authentification
	setupInterceptors(router) {
		// Intercepteur de réponse
		axios.interceptors.response.use(
			(response) => response,
			(error) => {
				if (error.response?.status === 401) {
					this.removeToken();
					router.push("/signin");
				}
				return Promise.reject(error);
			}
		);
	},
};
