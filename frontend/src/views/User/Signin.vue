<template>
	<div
		class="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4"
	>
		<div class="max-w-md w-full bg-white rounded-lg shadow-xl overflow-hidden">
			<div class="p-6">
				<h2 class="text-2xl font-bold text-center text-gray-800 mb-8">
					Connexion
				</h2>

				<!-- Formulaire standard -->
				<form
					@submit.prevent="handleLogin"
					v-if="!requires2FA"
					class="space-y-6"
				>
					<div>
						<label
							for="email"
							class="text-sm font-medium text-gray-700 block mb-2"
							>Email</label
						>
						<input
							type="email"
							id="email"
							v-model="email"
							placeholder="Entrer votre email"
							class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
							required
						/>
					</div>

					<div>
						<label
							for="password"
							class="text-sm font-medium text-gray-700 block mb-2"
							>Mot de passe</label
						>
						<input
							type="password"
							id="password"
							v-model="password"
							placeholder="Entrer votre mot de passe"
							class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
							required
						/>
					</div>

					<div class="flex items-center justify-between">
						<a href="#" class="text-sm text-blue-600 hover:underline"
							>Mot de passe oublié?</a
						>
					</div>

					<div>
						<button
							type="submit"
							class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
							:disabled="isLoading"
						>
							{{ isLoading ? "Connexion..." : "Se connecter" }}
						</button>
					</div>
				</form>

				<!-- Formulaire 2FA -->
				<form @submit.prevent="handle2FAVerification" v-else class="space-y-6">
					<div>
						<label
							for="token"
							class="text-sm font-medium text-gray-700 block mb-2"
						>
							Code d'authentification à 6 chiffres
						</label>
						<input
							type="text"
							id="token"
							v-model="twoFactorToken"
							class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
							maxlength="6"
							inputmode="numeric"
							pattern="[0-9]*"
							required
						/>
						<p class="mt-2 text-sm text-gray-600">
							Veuillez saisir le code généré par votre application
							d'authentification
						</p>
					</div>

					<div>
						<button
							type="submit"
							class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
							:disabled="isLoading"
						>
							{{ isLoading ? "Vérification..." : "Vérifier" }}
						</button>
					</div>
				</form>

				<!-- Message d'erreur -->
				<div
					v-if="errorMessage"
					class="mt-4 p-3 bg-red-100 text-red-700 rounded-lg"
				>
					{{ errorMessage }}
				</div>
			</div>

			<div
				class="py-4 px-6 bg-gray-50 border-t border-gray-100 flex justify-center"
			>
				<p class="text-sm text-gray-600">
					Pas encore de compte?
					<router-link to="/signup" class="text-blue-600 hover:underline"
						>S'inscrire</router-link
					>
				</p>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from "axios";
	import Cookies from "js-cookie";

	export default {
		name: "SignIn",
		data() {
			return {
				email: "",
				password: "",
				isLoading: false,
				errorMessage: "",
				requires2FA: false,
				userId: null,
				twoFactorToken: "",
			};
		},
		methods: {
			validateLoginForm() {
				if (!this.email.trim()) {
					this.errorMessage = "Veuillez entrer votre adresse email";
					return false;
				}
				if (!this.password) {
					this.errorMessage = "Veuillez entrer votre mot de passe";
					return false;
				}
				return true;
			},

			async handleLogin() {
				this.errorMessage = "";

				if (!this.validateLoginForm()) {
					return;
				}

				try {
					this.isLoading = true;

					const response = await axios.post(
						`${window.config.BACKEND_URL}/auth/login`,
						{
							email: this.email,
							password: this.password,
						}
					);

					// Vérifier si 2FA est requis
					if (response.data.requires2FA) {
						this.requires2FA = true;
						this.userId = response.data.userId;
						return;
					}

					// Sinon, authentification réussie
					this.handleAuthSuccess(response.data.token);
				} catch (error) {
					// Gestion détaillée des erreurs
					if (error.response) {
						const status = error.response.status;
						if (status === 401) {
							this.errorMessage = "Email ou mot de passe incorrect";
						} else if (status === 429) {
							this.errorMessage =
								"Trop de tentatives de connexion. Veuillez réessayer plus tard";
						} else if (status === 403) {
							this.errorMessage =
								"Votre compte est bloqué. Veuillez contacter l'administrateur";
						} else if (status === 500) {
							this.errorMessage =
								"Erreur serveur. Veuillez réessayer plus tard";
						} else {
							this.errorMessage =
								error.response.data.message || "Échec de la connexion";
						}
					} else if (error.request) {
						this.errorMessage =
							"Impossible de joindre le serveur. Vérifiez votre connexion internet";
					} else {
						this.errorMessage =
							"Erreur lors de l'envoi de la demande de connexion";
					}
					console.error("Erreur de connexion:", error);
				} finally {
					this.isLoading = false;
				}
			},

			validate2FAForm() {
				if (!this.twoFactorToken.trim()) {
					this.errorMessage = "Veuillez entrer le code d'authentification";
					return false;
				}
				if (!/^\d{6}$/.test(this.twoFactorToken)) {
					this.errorMessage = "Le code doit comporter exactement 6 chiffres";
					return false;
				}
				return true;
			},

			async handle2FAVerification() {
				this.errorMessage = "";

				if (!this.validate2FAForm()) {
					return;
				}

				try {
					this.isLoading = true;

					const response = await axios.post(
						`${window.config.BACKEND_URL}/auth/2fa/verify`,
						{
							userId: this.userId,
							token: this.twoFactorToken,
						}
					);

					this.handleAuthSuccess(response.data.token);
				} catch (error) {
					// Gestion détaillée des erreurs 2FA
					if (error.response) {
						const status = error.response.status;
						if (status === 401) {
							this.errorMessage = "Code d'authentification incorrect";
						} else if (status === 400) {
							this.errorMessage = "Code d'authentification invalide ou expiré";
						} 
						// else if (status === 429) {
						// 	this.errorMessage =
						// 		"Trop de tentatives. Veuillez réessayer plus tard";
						// } 
						else {
							this.errorMessage =
								error.response.data.message || "Échec de la vérification";
						}
					} else if (error.request) {
						this.errorMessage =
							"Impossible de joindre le serveur. Vérifiez votre connexion internet";
					} else {
						this.errorMessage =
							"Erreur lors de l'envoi du code d'authentification";
					}
					console.error("Erreur de vérification 2FA:", error);
				} finally {
					this.isLoading = false;
				}
			},

			handleAuthSuccess(token) {
				// Stocker le token dans le localStorage
				localStorage.setItem("authToken", token);

				// Configurer l'en-tête pour les futures requêtes
				axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

				// Rediriger vers la page d'accueil
				this.$router.push("/");
			},
		},
	};
</script>
