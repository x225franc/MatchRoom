<template>
	<div
		class="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4"
	>
		<div class="max-w-md w-full bg-white rounded-lg shadow-xl p-8 text-center">
			<div v-if="isLoading" class="space-y-6">
				<div
					class="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 mx-auto"
				></div>
				<h2 class="text-xl font-semibold text-gray-800">
					Déconnexion en cours...
				</h2>
			</div>

			<div v-else-if="error" class="space-y-6">
				<div
					class="rounded-full h-16 w-16 bg-red-100 mx-auto flex items-center justify-center"
				>
					<svg
						class="h-8 w-8 text-red-600"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M6 18L18 6M6 6l12 12"
						></path>
					</svg>
				</div>
				<h2 class="text-xl font-semibold text-gray-800">
					Erreur de déconnexion
				</h2>
				<p class="text-gray-600">{{ error }}</p>
				<div>
					<button
						@click="retryLogout"
						class="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
					>
						Réessayer
					</button>
				</div>
			</div>

			<div v-else class="space-y-6">
				<div
					class="rounded-full h-16 w-16 bg-green-100 mx-auto flex items-center justify-center"
				>
					<svg
						class="h-8 w-8 text-green-600"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M5 13l4 4L19 7"
						></path>
					</svg>
				</div>
				<h2 class="text-xl font-semibold text-gray-800">Déconnexion réussie</h2>
				<p class="text-gray-600">Vous avez été déconnecté avec succès.</p>
				<div>
					<router-link
						to="/"
						class="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
					>
						Retour à l'accueil
					</router-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from "axios";
	import Cookies from "js-cookie";

	export default {
		name: "SignOut",
		data() {
			return {
				isLoading: true,
				error: null,
			};
		},
		created() {
			this.logout();
		},
		methods: {
			async logout() {
				try {
					this.isLoading = true;
					this.error = null;

					// Récupérer le token d'authentification
					const token =
						Cookies.get("authToken") || sessionStorage.getItem("authToken");

					if (!token) {
						// Si pas de token, considérer comme déjà déconnecté
						this.isLoading = false;
						return;
					}

					// Configurer l'en-tête pour la requête de déconnexion
					axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

					try {
						// Appeler l'API de déconnexion
						await axios.post(`${window.config.BACKEND_URL}/auth/logout`);
					} catch (apiError) {
						// Gestion détaillée des erreurs API
						if (apiError.response) {
							const status = apiError.response.status;
							if (status === 401) {
								this.error = "Session expirée ou invalide";
							} else if (status === 500) {
								this.error =
									"Erreur serveur lors de la déconnexion. Vos informations ont été supprimées localement.";
							} else {
								this.error =
									apiError.response.data.message ||
									"Erreur lors de la déconnexion";
							}
						} else if (apiError.request) {
							this.error =
								"Impossible de joindre le serveur. Vos informations ont été supprimées localement.";
						} else {
							this.error = "Erreur lors de la tentative de déconnexion";
						}
						console.error("Erreur API de déconnexion:", apiError);
					}

					// Supprimer le token côté client dans tous les cas
					Cookies.remove("authToken");
					sessionStorage.removeItem("authToken");
					localStorage.removeItem("authToken"); // Au cas où

					// Supprimer l'en-tête d'autorisation pour les futures requêtes
					delete axios.defaults.headers.common["Authorization"];
				} catch (error) {
					this.error =
						"Erreur système lors de la déconnexion. Veuillez rafraîchir la page.";
					console.error("Erreur système de déconnexion:", error);
				} finally {
					this.isLoading = false;
				}
			},
			retryLogout() {
				this.logout();
			},
		},
	};
</script>
