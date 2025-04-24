<template>
	<div
		class="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4"
	>
		<div class="max-w-md w-full bg-white rounded-lg shadow-xl overflow-hidden">
			<div class="p-6">
				<div class="flex justify-center mb-4">
					<img
						src="@/assets/logo.png"
						alt="Logo Matchroom"
					/>
				</div>
				<h2 class="text-2xl font-bold text-center text-gray-800 mb-8">
					Créer un compte {{ isHotelier ? "Hôtelier" : "Voyageur" }}
				</h2>
				<form @submit.prevent="handleRegister" class="space-y-6">
					<!-- Champs communs -->
					<div>
						<label
							for="name"
							class="text-sm font-medium text-gray-700 block mb-2"
							>Nom complet</label
						>
						<input
							type="text"
							id="name"
							v-model="form.name"
							placeholder="Entrer votre nom complet"
							class="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
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
							v-model="form.email"
							placeholder="Entrer votre email"
							class="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
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
							v-model="form.password"
							placeholder="Entrer votre mot de passe"
							class="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
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
							v-model="form.confirmPassword"
							placeholder="Confirmer votre mot de passe"
							class="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
							required
						/>
					</div>
					<!-- Champs spécifiques hôtelier -->
					<div v-if="isHotelier">
						<label
							for="description"
							class="text-sm font-medium text-gray-700 block mb-2"
							>Description de l'hôtel</label
						>
						<textarea
							id="description"
							v-model="form.description"
							placeholder="Décrivez votre établissement"
							class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						></textarea>
					</div>
					<div v-if="isHotelier">
						<label
							for="siret"
							class="text-sm font-medium text-gray-700 block mb-2"
							>SIRET</label
						>
						<input
							type="text"
							id="siret"
							v-model="form.siret"
							placeholder="Numéro SIRET"
							class="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>
					<div v-if="isHotelier">
						<label
							for="tags"
							class="text-sm font-medium text-gray-700 block mb-2"
							>Tags (séparés par des virgules)</label
						>
						<input
							type="text"
							id="tags"
							v-model="form.tags"
							placeholder="ex: piscine, wifi, parking"
							class="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>
					<div v-if="isHotelier">
						<label
							for="rate"
							class="text-sm font-medium text-gray-700 block mb-2"
							>Taux</label
						>
						<input
							type="number"
							id="rate"
							v-model="form.rate"
							min="0"
							max="100"
							step="1"
							placeholder="Taux %"
							class="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
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
							class="w-full bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
						>
							{{ isLoading ? "Inscription en cours..." : "S'inscrire" }}
						</button>
					</div>
				</form>
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
				form: {
					name: "",
					email: "",
					password: "",
					confirmPassword: "",
					// device: "",
					// adress: "",
					// compAdress: "",
					// postCode: "",
					// city: "",
					// profilePic: "",
					// Hotelier only
					// description: "",
					// siret: "",
					// tags: "",
					// rate: "",
				},
				acceptTerms: false,
				isLoading: false,
				errorMessage: "",
				successMessage: "",
			};
		},
		computed: {
			isHotelier() {
				return this.$route.query.type === "hotelier";
			},
			role() {
				return this.isHotelier ? "hotelier" : "voyageur";
			},
		},
		methods: {
			validateForm() {
				if (this.form.name.trim() === "") {
					this.errorMessage = "Le nom est obligatoire";
					return false;
				}
				if (this.form.email.trim() === "") {
					this.errorMessage = "L'email est obligatoire";
					return false;
				}
				if (!/^\S+@\S+\.\S+$/.test(this.form.email)) {
					this.errorMessage = "Veuillez entrer une adresse email valide";
					return false;
				}
				if (this.form.password.length < 8) {
					this.errorMessage =
						"Le mot de passe doit contenir au moins 8 caractères";
					return false;
				}
				if (this.form.password !== this.form.confirmPassword) {
					this.errorMessage = "Les mots de passe ne correspondent pas";
					return false;
				}

				if (!this.acceptTerms) {
					this.errorMessage =
						"Vous devez accepter les conditions d'utilisation";
					return false;
				}
				if (this.isHotelier) {
					if (!this.form.siret.trim()) {
						this.errorMessage =
							"Le numéro SIRET est obligatoire pour les hôteliers";
						return false;
					}
					if (!this.form.description.trim()) {
						this.errorMessage = "La description de l'hôtel est obligatoire";
						return false;
					}
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
					const payload = {
						...this.form,
						role: this.role,
						status: this.isHotelier ? "pending" : "active",
						tags:
							this.isHotelier && this.form.tags
								? this.form.tags.split(",").map((t) => t.trim())
								: undefined,
					};
					// Nettoyer les champs inutiles pour voyageur
					if (!this.isHotelier) {
						delete payload.description;
						delete payload.siret;
						delete payload.tags;
						delete payload.rate;
					}
					// Nettoyer confirmPassword
					delete payload.confirmPassword;

					await axios.post(
						// `http://localhost:3001/auth/register`,
						`${window.config.BACKEND_URL}/auth/register`,
						payload
					);

					this.successMessage =
						"Inscription réussie ! Vous pouvez maintenant vous connecter.";
					setTimeout(() => {
						this.$router.push("/signin");
					}, 2000);
				} catch (error) {
					if (error.response) {
						const status = error.response.status;
						if (status === 409) {
							this.errorMessage = "Cette adresse email est déjà utilisée";
						} else if (status === 400) {
							this.errorMessage =
								error.response.data.message ||
								"Les données fournies sont incorrectes";
						} else if (status === 500) {
							this.errorMessage =
								"Erreur serveur. Veuillez réessayer plus tard";
						} else {
							this.errorMessage =
								error.response.data.message || "Erreur lors de l'inscription";
						}
					} else if (error.request) {
						this.errorMessage =
							"Impossible de joindre le serveur. Vérifiez votre connexion internet";
					} else {
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
