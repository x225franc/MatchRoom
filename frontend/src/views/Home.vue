<template>
	<div class="relative text-white font-serif">
		<!-- Section d'en-tête originale de Home avec image de Rome -->
		<div
			class="relative bg-cover bg-center bg-no-repeat min-h-[80vh] flex items-center justify-center px-4"
			style="background-image: url('/rome.webp')"
		>
			<div
				class="bg-black bg-opacity-60 w-full h-full absolute top-0 left-0 z-0"
			></div>
			<div class="z-10 text-center">
				<p class="text-[#E8CEB7] text-sm tracking-widest mb-2">
					La Nouvelle Façon de Réserver Votre Hôtel Idéal
				</p>
				<h1 class="text-4xl md:text-4xl font-bold leading-tight mb-4">
					MatchRoom - Réservez Votre Hôtel Idéal
				</h1>
				<button
					class="bg-gradient-to-b from-[#BAA089] to-[#E8CEB7] text-black px-6 py-2 rounded-full font-semibold hover:bg-yellow-400 transition"
				>
					DÉCOUVRIR PLUS →
				</button>
			</div>
		</div>
	</div>
	<div class="landing-page">


		<section class="py-16 bg-white">
			<div class="container mx-auto px-4">
				<h2 class="text-3xl md:text-4xl font-bold text-center mb-12">
					Notre Solution : L'Intelligence du Matching
				</h2>

				<div class="flex flex-col md:flex-row items-center">
					<div class="w-full md:w-1/2 mb-8 md:mb-0">
						<div
							class="w-full h-48 sm:h-64 md:h-64 lg:h-80 bg-tertiary flex items-center justify-center rounded-lg"
						>
							<span class="text-tertiary-2 text-xl font-semibold text-center">
								Processus de matching
							</span>
						</div>
					</div>

					<div class="w-full md:w-1/2 md:pl-12">
						<ul class="space-y-4">
							<li class="flex items-start">
								<div class="bg-primary-light rounded-full p-2 mr-4">
									<svg
										class="h-6 w-6 text-primary"
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
									<h3 class="font-semibold text-lg">
										Algorithme de matching unique
									</h3>
									<p class="text-tertiary">
										Qui associe clients et hôtels selon des critères précis
									</p>
								</div>
							</li>

							<li class="flex items-start">
								<div class="bg-primary-light rounded-full p-2 mr-4">
									<svg
										class="h-6 w-6 text-primary"
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
									<h3 class="font-semibold text-lg">
										Valorisation de l'unicité
									</h3>
									<p class="text-tertiary">
										Une plateforme qui met en avant les spécificités de chaque
										établissement
									</p>
								</div>
							</li>

							<li class="flex items-start">
								<div class="bg-primary-light rounded-full p-2 mr-4">
									<svg
										class="h-6 w-6 text-primary"
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
									<h3 class="font-semibold text-lg">
										Expérience personnalisée
									</h3>
									<p class="text-tertiary">
										Adaptée aux besoins spécifiques de chaque voyageur
									</p>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</section>

		<section class="py-16 bg-primary-light">
			<div class="container mx-auto px-4">
				<h2 class="text-3xl md:text-4xl font-bold text-center mb-12">
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
										class="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white text-xl font-bold"
									>
										1
									</div>
								</div>
								<div class="ml-4">
									<h4 class="text-lg font-medium">Créez votre profil</h4>
									<p class="mt-1 text-tertiary">
										Partagez vos préférences, style de voyage et priorités
									</p>
								</div>
							</div>

							<div class="flex">
								<div class="flex-shrink-0">
									<div
										class="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white text-xl font-bold"
									>
										2
									</div>
								</div>
								<div class="ml-4">
									<h4 class="text-lg font-medium">Exprimez vos besoins</h4>
									<p class="mt-1 text-tertiary">
										Pour chaque voyage, précisez vos attentes spécifiques
									</p>
								</div>
							</div>

							<div class="flex">
								<div class="flex-shrink-0">
									<div
										class="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white text-xl font-bold"
									>
										3
									</div>
								</div>
								<div class="ml-4">
									<h4 class="text-lg font-medium">Découvrez vos matches</h4>
									<p class="mt-1 text-tertiary">
										Notre algorithme vous présente les établissements parfaits
										pour vous
									</p>
								</div>
							</div>

							<div class="flex">
								<div class="flex-shrink-0">
									<div
										class="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-white text-xl font-bold"
									>
										4
									</div>
								</div>
								<div class="ml-4">
									<h4 class="text-lg font-medium">
										Réservez en toute confiance
									</h4>
									<p class="mt-1 text-tertiary">
										Avec l'assurance d'une expérience alignée avec vos attentes
									</p>
								</div>
							</div>
						</div>
					</div>

					<div>
						<h3 class="text-2xl font-semibold mb-6 text-secondary">
							Pour les Hôteliers
						</h3>
						<div class="space-y-8">
							<div class="flex">
								<div class="flex-shrink-0">
									<div
										class="flex items-center justify-center h-12 w-12 rounded-md bg-secondary text-white text-xl font-bold"
									>
										1
									</div>
								</div>
								<div class="ml-4">
									<h4 class="text-lg font-medium">
										Mettez en avant votre unicité
									</h4>
									<p class="mt-1 text-tertiary">
										Présentez les caractéristiques qui rendent votre
										établissement spécial
									</p>
								</div>
							</div>

							<div class="flex">
								<div class="flex-shrink-0">
									<div
										class="flex items-center justify-center h-12 w-12 rounded-md bg-secondary text-white text-xl font-bold"
									>
										2
									</div>
								</div>
								<div class="ml-4">
									<h4 class="text-lg font-medium">
										Définissez votre clientèle idéale
									</h4>
									<p class="mt-1 text-tertiary">
										Identifiez les voyageurs qui apprécieront le plus votre
										offre
									</p>
								</div>
							</div>

							<div class="flex">
								<div class="flex-shrink-0">
									<div
										class="flex items-center justify-center h-12 w-12 rounded-md bg-secondary text-white text-xl font-bold"
									>
										3
									</div>
								</div>
								<div class="ml-4">
									<h4 class="text-lg font-medium">
										Attirez des clients satisfaits
									</h4>
									<p class="mt-1 text-tertiary">
										Accueillez des voyageurs qui recherchent précisément ce que
										vous offrez
									</p>
								</div>
							</div>

							<div class="flex">
								<div class="flex-shrink-0">
									<div
										class="flex items-center justify-center h-12 w-12 rounded-md bg-secondary text-white text-xl font-bold"
									>
										4
									</div>
								</div>
								<div class="ml-4">
									<h4 class="text-lg font-medium">
										Construisez votre réputation
									</h4>
									<p class="mt-1 text-tertiary">
										Développez votre notoriété auprès de votre public cible
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>

		<section class="py-16 bg-white">
			<div class="container mx-auto px-4">
				<h2 class="text-3xl md:text-4xl font-bold text-center mb-12">
					Les Avantages de MatchRoom
				</h2>

				<div class="grid md:grid-cols-2 gap-8">
					<div class="bg-primary-light p-8 rounded-lg">
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

					<div class="bg-secondary-light p-8 rounded-lg">
						<h3 class="text-2xl font-semibold mb-6 text-secondary">
							Pour les Hôteliers
						</h3>
						<ul class="space-y-4">
							<li class="flex items-start">
								<svg
									class="h-6 w-6 text-secondary mr-2"
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
									class="h-6 w-6 text-secondary mr-2"
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
									class="h-6 w-6 text-secondary mr-2"
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
									class="h-6 w-6 text-secondary mr-2"
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

		<section class="py-16 bg-tertiary-2">
			<div class="container mx-auto px-4">
				<h2 class="text-3xl md:text-4xl font-bold text-center mb-12">
					Ils Ont Trouvé Leur Match Parfait
				</h2>

				<div class="grid md:grid-cols-2 gap-8">
					<div class="bg-white p-8 rounded-lg shadow-md">
						<div class="flex items-center mb-4">
							<div
								class="h-12 w-12 rounded-full bg-tertiary mr-4 flex items-center justify-center"
							>
								<span class="text-tertiary-2 font-bold text-lg">SM</span>
							</div>

							<div>
								<h4 class="font-semibold">Sophie M.</h4>
								<p class="text-tertiary text-sm">Consultante</p>
							</div>
						</div>
						<p class="text-tertiary italic">
							"Grâce à Matcher, j'ai découvert un hôtel-boutique qui
							correspondait exactement à mes attentes pour mon voyage d'affaires
							à Lyon. Une expérience sur mesure que je n'aurais jamais trouvée
							sur les plateformes traditionnelles."
						</p>
					</div>

					<div class="bg-white p-8 rounded-lg shadow-md">
						<div class="flex items-center mb-4">
							<div
								class="h-12 w-12 rounded-full bg-tertiary mr-4 flex items-center justify-center"
							>
								<span class="text-tertiary-2 font-bold text-lg">JD</span>
							</div>

							<div>
								<h4 class="font-semibold">Jean D.</h4>
								<p class="text-tertiary text-sm">
									Propriétaire de l'Hôtel Le Charme
								</p>
							</div>
						</div>
						<p class="text-tertiary italic">
							"En tant que petit hôtel indépendant, nous avions du mal à nous
							démarquer. Matcher nous a permis d'attirer une clientèle qui
							apprécie réellement notre philosophie et nos services. Notre taux
							de satisfaction client a explosé!"
						</p>
					</div>
				</div>
			</div>
		</section>

		<!-- <section class="py-16 bg-primary text-tertiary-2">
			<div class="container mx-auto px-4 text-center">
				<h2 class="text-3xl md:text-4xl font-bold mb-8">Notre Vision</h2>

				<p class="text-xl max-w-3xl mx-auto">
					Matcher aspire à transformer l'industrie hôtelière en créant un
					écosystème où chaque voyageur trouve l'hébergement parfaitement adapté
					à ses besoins, et où chaque établissement accueille les clients qui
					apprécieront véritablement son offre.
				</p>

				<p class="text-xl max-w-3xl mx-auto mt-6">
					Nous croyons en un avenir où la réservation hôtelière n'est plus une
					loterie, mais une science précise basée sur la compatibilité réelle
					entre l'offre et la demande.
				</p>
			</div>
		</section> -->

		<!-- <section
			class="py-16 bg-gradient-to-r from-primary to-secondary text-tertiary-2"
		>
			<div class="container mx-auto px-4 text-center">
				<h2 class="text-3xl md:text-4xl font-bold mb-8">
					Rejoignez la Révolution Matcher Dès Aujourd'hui
				</h2>

				<p class="text-xl max-w-3xl mx-auto mb-12">
					Transformez votre façon de voyager ou d'accueillir. Faites partie de
					l'avenir de l'hôtellerie.
				</p>

				<div
					class="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-8"
				>
					<router-link
						to="/signup?type=traveler"
						class="bg-tertiary-2 text-primary hover:bg-tertiary-2-dark px-8 py-4 rounded-lg font-bold text-lg transition duration-300 shadow-lg transform hover:-translate-y-1"
					>
						MATCHER !
					</router-link>

					<router-link
						to="/signup?type=hotelier"
						class="bg-transparent border-2 border-tertiary-2 hover:bg-tertiary-2 hover:text-primary px-8 py-4 rounded-lg font-bold text-lg transition duration-300 shadow-lg transform hover:-translate-y-1"
					>
						DEVENIR HÔTELIER
					</router-link>
				</div>
			</div>
		</section> -->
	
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
