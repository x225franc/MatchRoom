<template>
	<div class="landing-page">
		<!-- En-tête/Hero Section -->
		<header
			class="bg-gradient-to-r from-primary-dark to-primary text-tertiary-2"
		>
			<div class="container mx-auto px-4 py-16 md:py-24">
				<div class="flex flex-col md:flex-row items-center justify-between">
					<div class="md:w-1/2 mb-8 md:mb-0">
						<h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
							La Nouvelle Façon de Réserver Votre Hôtel Idéal
						</h1>
						<p class="text-xl md:text-2xl mb-8 text-tertiary-2-light">
							Découvrez MatchRoom - La plateforme qui révolutionne la
							réservation hôtelière en connectant vos besoins spécifiques avec
							l'hébergement parfait.
						</p>
						<div class="flex flex-wrap gap-4">
							<button
								class="bg-tertiary-2 text-primary hover:bg-tertiary-2-dark px-6 py-3 rounded-lg font-bold transition duration-300"
							>
								Découvrir
							</button>
							<button
								class="bg-transparent border-2 border-tertiary-2 hover:bg-tertiary-2 hover:text-primary px-6 py-3 rounded-lg font-bold transition duration-300"
							>
								Comment ça marche
							</button>
						</div>
					</div>
					<div class="md:w-2/5">
						<div
							class="w-full h-64 bg-tertiary-2-dark flex items-center justify-center rounded-lg"
						>
							<span class="text-tertiary text-xl font-semibold"
								>Image à venir</span
							>
						</div>
					</div>
				</div>
			</div>
		</header>

		<!-- Section Problématique -->
		<section class="py-16 bg-tertiary-2">
			<div class="container mx-auto px-4">
				<h2
					class="text-3xl md:text-4xl font-bold text-center mb-12 text-tertiary"
				>
					Le Problème des Réservations Traditionnelles
				</h2>

				<div class="grid md:grid-cols-2 gap-8">
					<div class="bg-white p-8 rounded-lg shadow-md">
						<h3 class="text-2xl font-semibold mb-4 text-primary">
							Pour les voyageurs
						</h3>
						<ul class="space-y-3">
							<li class="flex items-start">
								<svg
									class="h-6 w-6 text-secondary-dark mr-2"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
								Recherches imprécises et chronophages
							</li>
							<li class="flex items-start">
								<svg
									class="h-6 w-6 text-secondary-dark mr-2"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
								Résultats ne correspondant pas à vos véritables besoins
							</li>
							<li class="flex items-start">
								<svg
									class="h-6 w-6 text-secondary-dark mr-2"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
								Expérience client impersonnelle
							</li>
							<li class="flex items-start">
								<svg
									class="h-6 w-6 text-secondary-dark mr-2"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
								Filtres génériques qui ne capturent pas vos priorités réelles
							</li>
						</ul>
					</div>

					<div class="bg-white p-8 rounded-lg shadow-md">
						<h3 class="text-2xl font-semibold mb-4 text-secondary-dark">
							Pour les hôteliers
						</h3>
						<ul class="space-y-3">
							<li class="flex items-start">
								<svg
									class="h-6 w-6 text-secondary-dark mr-2"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
								Difficulté à mettre en valeur leurs véritables atouts
							</li>
							<li class="flex items-start">
								<svg
									class="h-6 w-6 text-secondary-dark mr-2"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
								Peine à attirer la clientèle spécifique qui appréciera leur
								établissement
							</li>
							<li class="flex items-start">
								<svg
									class="h-6 w-6 text-secondary-dark mr-2"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
								Difficulté à se différencier efficacement de la concurrence
							</li>
							<li class="flex items-start">
								<svg
									class="h-6 w-6 text-secondary-dark mr-2"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
								Communication marketing peu ciblée et coûteuse
							</li>
						</ul>
					</div>
				</div>
			</div>
		</section>

		<!-- Section Solution -->
		<section class="py-16 bg-white">
			<div class="container mx-auto px-4">
				<h2
					class="text-3xl md:text-4xl font-bold text-center mb-12 text-tertiary"
				>
					Notre Solution : L'Intelligence du Matching
				</h2>

				<div class="flex flex-col md:flex-row items-center">
					<div class="md:w-1/2 mb-8 md:mb-0">
						<div
							class="w-full h-64 bg-tertiary-2 flex items-center justify-center rounded-lg"
						>
							<span class="text-tertiary-light text-xl font-semibold"
								>Processus de matching</span
							>
						</div>
					</div>

					<div class="md:w-1/2 md:pl-12">
						<ul class="space-y-4">
							<li class="flex items-start">
								<div class="bg-primary-light rounded-full p-2 mr-4">
									<svg
										class="h-6 w-6 text-tertiary-2"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
										/>
									</svg>
								</div>
								<div>
									<h3 class="font-semibold text-lg text-tertiary">
										Algorithme de matching unique
									</h3>
									<p class="text-tertiary-light">
										Qui associe clients et hôtels selon des critères précis
									</p>
								</div>
							</li>

							<li class="flex items-start">
								<div class="bg-primary-light rounded-full p-2 mr-4">
									<svg
										class="h-6 w-6 text-tertiary-2"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
										/>
									</svg>
								</div>
								<div>
									<h3 class="font-semibold text-lg text-tertiary">
										Valorisation de l'unicité
									</h3>
									<p class="text-tertiary-light">
										Une plateforme qui met en avant les spécificités de chaque
										établissement
									</p>
								</div>
							</li>

							<li class="flex items-start">
								<div class="bg-primary-light rounded-full p-2 mr-4">
									<svg
										class="h-6 w-6 text-tertiary-2"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
										/>
									</svg>
								</div>
								<div>
									<h3 class="font-semibold text-lg text-tertiary">
										Expérience personnalisée
									</h3>
									<p class="text-tertiary-light">
										Adaptée aux besoins spécifiques de chaque voyageur
									</p>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</section>

		<!-- Section Fonctionnement -->
		<section class="py-16 bg-tertiary-2">
			<div class="container mx-auto px-4">
				<h2
					class="text-3xl md:text-4xl font-bold text-center mb-12 text-tertiary"
				>
					Comment Ça Fonctionne ?
				</h2>

				<div class="grid md:grid-cols-2 gap-12">
					<div>
						<h3 class="text-2xl font-semibold mb-6 text-primary">
							Pour les Voyageurs
						</h3>
						<div class="space-y-8">
							<div class="flex">
								<div class="flex-shrink-0">
									<div
										class="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-tertiary-2 text-xl font-bold"
									>
										1
									</div>
								</div>
								<div class="ml-4">
									<h4 class="text-lg font-medium text-tertiary">
										Créez votre profil
									</h4>
									<p class="mt-1 text-tertiary-light">
										Partagez vos préférences, style de voyage et priorités
									</p>
								</div>
							</div>

							<div class="flex">
								<div class="flex-shrink-0">
									<div
										class="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-tertiary-2 text-xl font-bold"
									>
										2
									</div>
								</div>
								<div class="ml-4">
									<h4 class="text-lg font-medium text-tertiary">
										Exprimez vos besoins
									</h4>
									<p class="mt-1 text-tertiary-light">
										Pour chaque voyage, précisez vos attentes spécifiques
									</p>
								</div>
							</div>

							<div class="flex">
								<div class="flex-shrink-0">
									<div
										class="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-tertiary-2 text-xl font-bold"
									>
										3
									</div>
								</div>
								<div class="ml-4">
									<h4 class="text-lg font-medium text-tertiary">
										Découvrez vos matches
									</h4>
									<p class="mt-1 text-tertiary-light">
										Notre algorithme vous présente les établissements parfaits
										pour vous
									</p>
								</div>
							</div>

							<div class="flex">
								<div class="flex-shrink-0">
									<div
										class="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-tertiary-2 text-xl font-bold"
									>
										4
									</div>
								</div>
								<div class="ml-4">
									<h4 class="text-lg font-medium text-tertiary">
										Réservez en toute confiance
									</h4>
									<p class="mt-1 text-tertiary-light">
										Avec l'assurance d'une expérience alignée avec vos attentes
									</p>
								</div>
							</div>
						</div>
					</div>

					<div>
						<h3 class="text-2xl font-semibold mb-6 text-secondary-dark">
							Pour les Hôteliers
						</h3>
						<div class="space-y-8">
							<div class="flex">
								<div class="flex-shrink-0">
									<div
										class="flex items-center justify-center h-12 w-12 rounded-md bg-secondary text-tertiary text-xl font-bold"
									>
										1
									</div>
								</div>
								<div class="ml-4">
									<h4 class="text-lg font-medium text-tertiary">
										Mettez en avant votre unicité
									</h4>
									<p class="mt-1 text-tertiary-light">
										Présentez les caractéristiques qui rendent votre
										établissement spécial
									</p>
								</div>
							</div>

							<div class="flex">
								<div class="flex-shrink-0">
									<div
										class="flex items-center justify-center h-12 w-12 rounded-md bg-secondary text-tertiary text-xl font-bold"
									>
										2
									</div>
								</div>
								<div class="ml-4">
									<h4 class="text-lg font-medium text-tertiary">
										Définissez votre clientèle idéale
									</h4>
									<p class="mt-1 text-tertiary-light">
										Identifiez les voyageurs qui apprécieront le plus votre
										offre
									</p>
								</div>
							</div>

							<div class="flex">
								<div class="flex-shrink-0">
									<div
										class="flex items-center justify-center h-12 w-12 rounded-md bg-secondary text-tertiary text-xl font-bold"
									>
										3
									</div>
								</div>
								<div class="ml-4">
									<h4 class="text-lg font-medium text-tertiary">
										Attirez des clients satisfaits
									</h4>
									<p class="mt-1 text-tertiary-light">
										Accueillez des voyageurs qui recherchent précisément ce que
										vous offrez
									</p>
								</div>
							</div>

							<div class="flex">
								<div class="flex-shrink-0">
									<div
										class="flex items-center justify-center h-12 w-12 rounded-md bg-secondary text-tertiary text-xl font-bold"
									>
										4
									</div>
								</div>
								<div class="ml-4">
									<h4 class="text-lg font-medium text-tertiary">
										Construisez votre réputation
									</h4>
									<p class="mt-1 text-tertiary-light">
										Développez votre notoriété auprès de votre public cible
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Section Avantages -->
		<section class="py-16 bg-white">
			<div class="container mx-auto px-4">
				<h2
					class="text-3xl md:text-4xl font-bold text-center mb-12 text-tertiary"
				>
					Les Avantages de Matcher
				</h2>

				<div class="grid md:grid-cols-2 gap-8">
					<div class="bg-tertiary-2 p-8 rounded-lg">
						<h3 class="text-2xl font-semibold mb-6 text-primary">
							Pour les Voyageurs
						</h3>
						<ul class="space-y-4">
							<li class="flex items-start">
								<svg
									class="h-6 w-6 text-primary mr-2"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
								<div>
									<span class="font-medium">Gain de temps considérable</span> -
									Fini les heures de recherche, notre IA fait le travail pour
									vous
								</div>
							</li>
							<li class="flex items-start">
								<svg
									class="h-6 w-6 text-primary mr-2"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
								<div>
									<span class="font-medium"
										>Recommandations personnalisées</span
									>
									- Des suggestions qui correspondent réellement à vos attentes
								</div>
							</li>
							<li class="flex items-start">
								<svg
									class="h-6 w-6 text-primary mr-2"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
								<div>
									<span class="font-medium">Découvertes uniques</span> - Accédez
									à des établissements qui vous auraient échappé sur les
									plateformes traditionnelles
								</div>
							</li>
							<li class="flex items-start">
								<svg
									class="h-6 w-6 text-primary mr-2"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
								<div>
									<span class="font-medium">Satisfaction garantie</span> - Une
									correspondance optimale entre vos besoins et l'offre hôtelière
								</div>
							</li>
						</ul>
					</div>

					<div class="bg-tertiary-2-dark p-8 rounded-lg">
						<h3 class="text-2xl font-semibold mb-6 text-secondary-dark">
							Pour les Hôteliers
						</h3>
						<ul class="space-y-4">
							<li class="flex items-start">
								<svg
									class="h-6 w-6 text-secondary-dark mr-2"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
								<div>
									<span class="font-medium">Marketing ciblé et efficace</span> -
									Touchez directement les clients qui valorisent votre offre
								</div>
							</li>
							<li class="flex items-start">
								<svg
									class="h-6 w-6 text-secondary-dark mr-2"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
								<div>
									<span class="font-medium">Différenciation stratégique</span> -
									Mettez en avant vos points forts uniques
								</div>
							</li>
							<li class="flex items-start">
								<svg
									class="h-6 w-6 text-secondary-dark mr-2"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
								<div>
									<span class="font-medium">Clientèle plus satisfaite</span> -
									Accueillez des voyageurs dont les attentes correspondent à
									votre réalité
								</div>
							</li>
							<li class="flex items-start">
								<svg
									class="h-6 w-6 text-secondary-dark mr-2"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
								<div>
									<span class="font-medium">Meilleur taux d'occupation</span> -
									Optimisez votre remplissage avec des clients adaptés
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
	export default {
		name: "HomePage",
		created() {
			// On pourrait ajouter ici des traqueurs d'événements ou d'autres logiques d'initialisation
		},
		methods: {
			// Méthodes pour gérer les interactions utilisateur si nécessaire
		},
	};
</script>

<style scoped>
	/* Animations et styles spécifiques si nécessaires */
	.landing-page {
		overflow-x: hidden;
	}
</style>
