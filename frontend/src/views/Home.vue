<template>
	<div class="landing-page">
		<!-- En-tête/Hero Section -->
		<header class="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
			<div class="container mx-auto px-4 py-16 md:py-24">
				<div class="flex flex-col md:flex-row items-center justify-between">
					<div class="md:w-1/2 mb-8 md:mb-0">
						<h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
							La Nouvelle Façon de Réserver Votre Hôtel Idéal
						</h1>
						<p class="text-xl md:text-2xl mb-8 text-blue-100">
							Découvrez Matcher - La plateforme qui révolutionne la réservation
							hôtelière en connectant vos besoins spécifiques avec l'hébergement
							parfait.
						</p>
						<div class="flex flex-wrap gap-4">
							<button
								class="bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-bold transition duration-300"
							>
								Découvrir
							</button>
							<button
								class="bg-transparent border-2 border-white hover:bg-white hover:text-blue-600 px-6 py-3 rounded-lg font-bold transition duration-300"
							>
								Comment ça marche
							</button>
						</div>
					</div>
					<div class="md:w-2/5">
						<!-- <img
							src="@/assets/hero-image.jpg"
							alt="Voyageur satisfait"
							class="rounded-lg shadow-xl"
							onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80';"
						/> -->
					</div>
				</div>
			</div>
		</header>

		<!-- Section Problématique -->
		<section class="py-16 bg-gray-50">
			<div class="container mx-auto px-4">
				<h2 class="text-3xl md:text-4xl font-bold text-center mb-12">
					Le Problème des Réservations Traditionnelles
				</h2>

				<div class="grid md:grid-cols-2 gap-8">
					<div class="bg-white p-8 rounded-lg shadow-md">
						<h3 class="text-2xl font-semibold mb-4 text-blue-600">
							Pour les voyageurs
						</h3>
						<ul class="space-y-3">
							<li class="flex items-start">
								<svg
									class="h-6 w-6 text-red-500 mr-2"
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
									class="h-6 w-6 text-red-500 mr-2"
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
									class="h-6 w-6 text-red-500 mr-2"
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
									class="h-6 w-6 text-red-500 mr-2"
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
						<h3 class="text-2xl font-semibold mb-4 text-purple-600">
							Pour les hôteliers
						</h3>
						<ul class="space-y-3">
							<li class="flex items-start">
								<svg
									class="h-6 w-6 text-red-500 mr-2"
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
									class="h-6 w-6 text-red-500 mr-2"
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
									class="h-6 w-6 text-red-500 mr-2"
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
									class="h-6 w-6 text-red-500 mr-2"
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
				<h2 class="text-3xl md:text-4xl font-bold text-center mb-12">
					Notre Solution : L'Intelligence du Matching
				</h2>

				<div class="flex flex-col md:flex-row items-center">
					<div class="md:w-1/2 mb-8 md:mb-0">
						<!-- <img
							src="@/assets/matching-process.svg"
							alt="Processus de matching"
							class="mx-auto"
							onerror="this.onerror=null; this.src='data:image/svg+xml;charset=utf-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'300\' height=\'200\' viewBox=\'0 0 300 200\'%3E%3Crect fill=\'%23e2e8f0\' width=\'300\' height=\'200\'/%3E%3Ctext fill=\'%23718096\' font-family=\'sans-serif\' font-size=\'16\' x=\'50%25\' y=\'50%25\' text-anchor=\'middle\' dominant-baseline=\'middle\'%3EProcessus de matching%3C/text%3E%3C/svg%3E';"
						/> -->
					</div>

					<div class="md:w-1/2 md:pl-12">
						<ul class="space-y-4">
							<li class="flex items-start">
								<div class="bg-blue-100 rounded-full p-2 mr-4">
									<svg
										class="h-6 w-6 text-blue-600"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M13 10V3L4 14h7v7l9-11h-7z"
										/>
									</svg>
								</div>
								<div>
									<h3 class="font-semibold text-lg">IA avancée</h3>
									<p class="text-gray-600">
										Un système qui comprend vos priorités personnelles
									</p>
								</div>
							</li>

							<li class="flex items-start">
								<div class="bg-blue-100 rounded-full p-2 mr-4">
									<svg
										class="h-6 w-6 text-blue-600"
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
									<p class="text-gray-600">
										Qui associe clients et hôtels selon des critères précis
									</p>
								</div>
							</li>

							<li class="flex items-start">
								<div class="bg-blue-100 rounded-full p-2 mr-4">
									<svg
										class="h-6 w-6 text-blue-600"
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
									<p class="text-gray-600">
										Une plateforme qui met en avant les spécificités de chaque
										établissement
									</p>
								</div>
							</li>

							<li class="flex items-start">
								<div class="bg-blue-100 rounded-full p-2 mr-4">
									<svg
										class="h-6 w-6 text-blue-600"
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
									<p class="text-gray-600">
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
		<section class="py-16 bg-blue-50">
			<div class="container mx-auto px-4">
				<h2 class="text-3xl md:text-4xl font-bold text-center mb-12">
					Comment Ça Fonctionne ?
				</h2>

				<div class="grid md:grid-cols-2 gap-12">
					<div>
						<h3 class="text-2xl font-semibold mb-6 text-blue-600">
							Pour les Voyageurs
						</h3>
						<div class="space-y-8">
							<div class="flex">
								<div class="flex-shrink-0">
									<div
										class="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white text-xl font-bold"
									>
										1
									</div>
								</div>
								<div class="ml-4">
									<h4 class="text-lg font-medium">Créez votre profil</h4>
									<p class="mt-1 text-gray-600">
										Partagez vos préférences, style de voyage et priorités
									</p>
								</div>
							</div>

							<div class="flex">
								<div class="flex-shrink-0">
									<div
										class="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white text-xl font-bold"
									>
										2
									</div>
								</div>
								<div class="ml-4">
									<h4 class="text-lg font-medium">Exprimez vos besoins</h4>
									<p class="mt-1 text-gray-600">
										Pour chaque voyage, précisez vos attentes spécifiques
									</p>
								</div>
							</div>

							<div class="flex">
								<div class="flex-shrink-0">
									<div
										class="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white text-xl font-bold"
									>
										3
									</div>
								</div>
								<div class="ml-4">
									<h4 class="text-lg font-medium">Découvrez vos matches</h4>
									<p class="mt-1 text-gray-600">
										Notre algorithme vous présente les établissements parfaits
										pour vous
									</p>
								</div>
							</div>

							<div class="flex">
								<div class="flex-shrink-0">
									<div
										class="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white text-xl font-bold"
									>
										4
									</div>
								</div>
								<div class="ml-4">
									<h4 class="text-lg font-medium">
										Réservez en toute confiance
									</h4>
									<p class="mt-1 text-gray-600">
										Avec l'assurance d'une expérience alignée avec vos attentes
									</p>
								</div>
							</div>
						</div>
					</div>

					<div>
						<h3 class="text-2xl font-semibold mb-6 text-purple-600">
							Pour les Hôteliers
						</h3>
						<div class="space-y-8">
							<div class="flex">
								<div class="flex-shrink-0">
									<div
										class="flex items-center justify-center h-12 w-12 rounded-md bg-purple-600 text-white text-xl font-bold"
									>
										1
									</div>
								</div>
								<div class="ml-4">
									<h4 class="text-lg font-medium">
										Mettez en avant votre unicité
									</h4>
									<p class="mt-1 text-gray-600">
										Présentez les caractéristiques qui rendent votre
										établissement spécial
									</p>
								</div>
							</div>

							<div class="flex">
								<div class="flex-shrink-0">
									<div
										class="flex items-center justify-center h-12 w-12 rounded-md bg-purple-600 text-white text-xl font-bold"
									>
										2
									</div>
								</div>
								<div class="ml-4">
									<h4 class="text-lg font-medium">
										Définissez votre clientèle idéale
									</h4>
									<p class="mt-1 text-gray-600">
										Identifiez les voyageurs qui apprécieront le plus votre
										offre
									</p>
								</div>
							</div>

							<div class="flex">
								<div class="flex-shrink-0">
									<div
										class="flex items-center justify-center h-12 w-12 rounded-md bg-purple-600 text-white text-xl font-bold"
									>
										3
									</div>
								</div>
								<div class="ml-4">
									<h4 class="text-lg font-medium">
										Attirez des clients satisfaits
									</h4>
									<p class="mt-1 text-gray-600">
										Accueillez des voyageurs qui recherchent précisément ce que
										vous offrez
									</p>
								</div>
							</div>

							<div class="flex">
								<div class="flex-shrink-0">
									<div
										class="flex items-center justify-center h-12 w-12 rounded-md bg-purple-600 text-white text-xl font-bold"
									>
										4
									</div>
								</div>
								<div class="ml-4">
									<h4 class="text-lg font-medium">
										Construisez votre réputation
									</h4>
									<p class="mt-1 text-gray-600">
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
				<h2 class="text-3xl md:text-4xl font-bold text-center mb-12">
					Les Avantages de Matcher
				</h2>

				<div class="grid md:grid-cols-2 gap-8">
					<div class="bg-blue-50 p-8 rounded-lg">
						<h3 class="text-2xl font-semibold mb-6 text-blue-600">
							Pour les Voyageurs
						</h3>
						<ul class="space-y-4">
							<li class="flex items-start">
								<svg
									class="h-6 w-6 text-blue-600 mr-2"
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
									class="h-6 w-6 text-blue-600 mr-2"
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
									class="h-6 w-6 text-blue-600 mr-2"
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
									class="h-6 w-6 text-blue-600 mr-2"
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

					<div class="bg-purple-50 p-8 rounded-lg">
						<h3 class="text-2xl font-semibold mb-6 text-purple-600">
							Pour les Hôteliers
						</h3>
						<ul class="space-y-4">
							<li class="flex items-start">
								<svg
									class="h-6 w-6 text-purple-600 mr-2"
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
									class="h-6 w-6 text-purple-600 mr-2"
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
									class="h-6 w-6 text-purple-600 mr-2"
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
									class="h-6 w-6 text-purple-600 mr-2"
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

		<!-- Section Témoignages -->
		<section class="py-16 bg-gray-50">
			<div class="container mx-auto px-4">
				<h2 class="text-3xl md:text-4xl font-bold text-center mb-12">
					Ils Ont Trouvé Leur Match Parfait
				</h2>

				<div class="grid md:grid-cols-2 gap-8">
					<div class="bg-white p-8 rounded-lg shadow-md">
						<div class="flex items-center mb-4">
							<!-- <img
								class="h-12 w-12 rounded-full object-cover mr-4"
								src="@/assets/testimonial-1.jpg"
								alt="Sophie M."
								onerror="this.onerror=null; this.src='https://randomuser.me/api/portraits/women/42.jpg';"
							/> -->
							<div>
								<h4 class="font-semibold">Sophie M.</h4>
								<p class="text-gray-600 text-sm">Consultante</p>
							</div>
						</div>
						<p class="text-gray-700 italic">
							"Grâce à Matcher, j'ai découvert un hôtel-boutique qui
							correspondait exactement à mes attentes pour mon voyage d'affaires
							à Lyon. Une expérience sur mesure que je n'aurais jamais trouvée
							sur les plateformes traditionnelles."
						</p>
					</div>

					<div class="bg-white p-8 rounded-lg shadow-md">
						<div class="flex items-center mb-4">
							<!-- <img
								class="h-12 w-12 rounded-full object-cover mr-4"
								src="@/assets/testimonial-2.jpg"
								alt="Jean D."
								onerror="this.onerror=null; this.src='https://randomuser.me/api/portraits/men/32.jpg';"
							/> -->
							<div>
								<h4 class="font-semibold">Jean D.</h4>
								<p class="text-gray-600 text-sm">
									Propriétaire de l'Hôtel Le Charme
								</p>
							</div>
						</div>
						<p class="text-gray-700 italic">
							"En tant que petit hôtel indépendant, nous avions du mal à nous
							démarquer. Matcher nous a permis d'attirer une clientèle qui
							apprécie réellement notre philosophie et nos services. Notre taux
							de satisfaction client a explosé!"
						</p>
					</div>
				</div>
			</div>
		</section>

		<!-- Section Vision -->
		<section class="py-16 bg-blue-600 text-white">
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
		</section>

		<!-- Section CTA -->
		<section
			class="py-16 bg-gradient-to-r from-blue-500 to-purple-600 text-white"
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
						to="/signup"
						class="bg-white text-blue-600 hover:bg-blue-100 px-8 py-4 rounded-lg font-bold text-lg transition duration-300 shadow-lg transform hover:-translate-y-1"
					>
						DEVENIR CLIENT → MATCHER !
					</router-link>

					<router-link
						to="/signup?type=hotelier"
						class="bg-transparent border-2 border-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg font-bold text-lg transition duration-300 shadow-lg transform hover:-translate-y-1"
					>
						DEVENIR HÔTELIER
					</router-link>
				</div>
			</div>
		</section>

		<!-- Footer -->
		<footer class="bg-gray-800 text-white py-12">
			<div class="container mx-auto px-4">
				<div class="flex flex-wrap justify-between">
					<div class="w-full md:w-1/4 mb-8 md:mb-0">
						<h3 class="text-2xl font-bold mb-4">Matcher</h3>
						<p class="text-gray-400">
							La Nouvelle Ère de la Réservation Hôtelière
						</p>
					</div>

					<div class="w-full md:w-1/4 mb-8 md:mb-0">
						<h4 class="text-lg font-semibold mb-4">Liens Utiles</h4>
						<ul class="space-y-2">
							<li>
								<router-link to="/about" class="text-gray-400 hover:text-white"
									>À Propos</router-link
								>
							</li>
							<li>
								<router-link to="/faq" class="text-gray-400 hover:text-white"
									>FAQ</router-link
								>
							</li>
							<li>
								<router-link
									to="/contact"
									class="text-gray-400 hover:text-white"
									>Contact</router-link
								>
							</li>
						</ul>
					</div>

					<div class="w-full md:w-1/4 mb-8 md:mb-0">
						<h4 class="text-lg font-semibold mb-4">Juridique</h4>
						<ul class="space-y-2">
							<li>
								<router-link to="/terms" class="text-gray-400 hover:text-white"
									>Conditions d'utilisation</router-link
								>
							</li>
							<li>
								<router-link
									to="/privacy"
									class="text-gray-400 hover:text-white"
									>Politique de confidentialité</router-link
								>
							</li>
						</ul>
					</div>

					<div class="w-full md:w-1/4">
						<h4 class="text-lg font-semibold mb-4">Suivez-nous</h4>
						<div class="flex space-x-4">
							<a href="#" class="text-gray-400 hover:text-white">
								<span class="sr-only">Facebook</span>
								<svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
									<path
										fill-rule="evenodd"
										d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
										clip-rule="evenodd"
									></path>
								</svg>
							</a>
							<a href="#" class="text-gray-400 hover:text-white">
								<span class="sr-only">Instagram</span>
								<svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
									<path
										fill-rule="evenodd"
										d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
										clip-rule="evenodd"
									></path>
								</svg>
							</a>
							<a href="#" class="text-gray-400 hover:text-white">
								<span class="sr-only">Twitter</span>
								<svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
									<path
										d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"
									></path>
								</svg>
							</a>
						</div>
					</div>
				</div>

				<div class="border-t border-gray-700 mt-8 pt-8 text-center">
					<p class="text-gray-400">
						&copy; {{ new Date().getFullYear() }} Matcher - La Nouvelle Ère de
						la Réservation Hôtelière. Tous droits réservés.
					</p>
				</div>
			</div>
		</footer>
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
