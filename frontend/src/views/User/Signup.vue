<template>
	<div
		class="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4"
	>
		<div class="max-w-md w-full bg-white rounded-lg shadow-xl overflow-hidden">
			<div class="p-6">
				<h2 class="text-2xl font-bold text-center text-gray-800 mb-8">
					Créer un compte
				</h2>

				<form @submit.prevent="handleRegister" class="space-y-6">
					<div>
						<label
							for="name"
							class="text-sm font-medium text-gray-700 block mb-2"
							>Nom complet</label
						>
						<input
							type="text"
							id="name"
							v-model="name"
                            placeholder="Entrer votre nom complet"
							class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
							required
						/>
					</div>

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
							minlength="8"
						/>
						<p class="mt-1 text-xs text-gray-500">Au moins 8 caractères</p>
					</div>

					<div>
						<label
							for="confirmPassword"
							class="text-sm font-medium text-gray-700 block mb-2"
							>Confirmer le mot de passe</label
						>
						<input
							type="password"
							id="confirmPassword"
							v-model="confirmPassword"
                            placeholder="Confirmer votre mot de passe"
							class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
							required
						/>
					</div>

					<div class="flex items-center">
						<input
							type="checkbox"
							id="terms"
							v-model="acceptTerms"
							class="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
							required
						/>
						<label for="terms" class="ml-2 text-sm text-gray-700">
							J'accepte les
							<a href="#" class="text-blue-600 hover:underline"
								>conditions d'utilisation</a
							>
						</label>
					</div>

					<div>
						<button
							type="submit"
							class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
							
						>
							{{ isLoading ? "Inscription en cours..." : "S'inscrire" }}
						</button>
					</div>
				</form>

				<!-- Message de succès ou d'erreur -->
				<div
					v-if="successMessage"
					class="mt-4 p-3 bg-green-100 text-green-700 rounded-lg"
				>
					{{ successMessage }}
				</div>
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
					Déjà un compte?
					<router-link to="/signin" class="text-blue-600 hover:underline"
						>Se connecter</router-link
					>
				</p>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from "axios";

	export default {
		name: "SignUp",
		data() {
			return {
				name: "",
				email: "",
				password: "",
				confirmPassword: "",
				acceptTerms: false,
				isLoading: false,
				errorMessage: "",
				successMessage: "",
			};
		},
		computed: {
			formIsValid() {
				return (
					this.name.trim() !== "" &&
					this.email.trim() !== "" &&
					this.password.length >= 8 &&
					this.password === this.confirmPassword &&
					this.acceptTerms
				);
			},
		},
		methods: {
			validateForm() {
				// Validation détaillée avec messages d'erreur spécifiques
				if (this.name.trim() === "") {
					this.errorMessage = "Le nom est obligatoire";
					return false;
				}
				if (this.email.trim() === "") {
					this.errorMessage = "L'email est obligatoire";
					return false;
				}
				if (!/^\S+@\S+\.\S+$/.test(this.email)) {
					this.errorMessage = "Veuillez entrer une adresse email valide";
					return false;
				}
				if (this.password.length < 8) {
					this.errorMessage = "Le mot de passe doit contenir au moins 8 caractères";
					return false;
				}
				if (this.password !== this.confirmPassword) {
					this.errorMessage = "Les mots de passe ne correspondent pas";
					return false;
				}
				if (!this.acceptTerms) {
					this.errorMessage = "Vous devez accepter les conditions d'utilisation";
					return false;
				}
				return true;
			},
			
			async handleRegister() {
				this.errorMessage = "";
				
				if (!this.validateForm()) {
					return;
				}

				try {
					this.isLoading = true;

					const response = await axios.post(
						`${window.config.BACKEND_URL}/auth/register`,
						{
							name: this.name,
							email: this.email,
							password: this.password,
						}
					);

					this.successMessage =
						"Inscription réussie ! Vous pouvez maintenant vous connecter.";

					// Redirection automatique après 2 secondes
					setTimeout(() => {
						this.$router.push("/signin");
					}, 2000);
				} catch (error) {
					// Gestion plus détaillée des erreurs
					if (error.response) {
						// Le serveur a répondu avec un code d'erreur
						const status = error.response.status;
						if (status === 409) {
							this.errorMessage = "Cette adresse email est déjà utilisée";
						} else if (status === 400) {
							this.errorMessage = error.response.data.message || "Les données fournies sont incorrectes";
						} else if (status === 500) {
							this.errorMessage = "Erreur serveur. Veuillez réessayer plus tard";
						} else {
							this.errorMessage = error.response.data.message || "Erreur lors de l'inscription";
						}
					} else if (error.request) {
						// La requête a été faite mais pas de réponse
						this.errorMessage = "Impossible de joindre le serveur. Vérifiez votre connexion internet";
					} else {
						// Erreur lors de la configuration de la requête
						this.errorMessage = "Erreur lors de l'envoi de la demande";
					}
					console.error("Erreur d'inscription:", error);
				} finally {
					this.isLoading = false;
				}
			},
		},
	};
</script>
