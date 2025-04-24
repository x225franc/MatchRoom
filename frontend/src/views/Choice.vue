<template>
	<div class="bg-white dark:bg-neutral-800 p-12">
		<h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-1">
			Choisissez une ville
		</h1>
		<p class="text-gray-500 dark:text-gray-400 mb-8">Visitez toute l'Europe</p>

		<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
			<router-link
				v-for="(city, index) in cities"
				:key="index"
				:to="{ name: 'Swipe', params: { city: city.name } }"
				class="relative rounded overflow-hidden shadow-lg block group"
			>
				<img
					:src="city.image"
					:alt="city.name"
					class="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
				/>
				<div
					class="absolute inset-0 bg-black bg-opacity-25 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
				></div>
				<div
					class="absolute bottom-0 left-0 w-full h-1/3"
					style="background-color: #1e1e1e4d"
				></div>

				<div class="absolute bottom-4 left-4 z-10 text-white">
					<h2 class="text-xl font-bold">{{ city.name }}</h2>
					<p class="text-sm">{{ city.country }}</p>
				</div>
				<div class="absolute bottom-4 right-4 z-10 text-white text-sm">
					À {{ city.distance }}
				</div>
			</router-link>
		</div>
	</div>
</template>

<script setup>
	import { useRouter } from "vue-router";

	const cities = [
		{
			name: "Rotterdam",
			country: "Pays-Bas",
			distance: "450 km",
			image: "/rotterdam.webp",
		},
		{
			name: "Paris",
			country: "France",
			distance: "0 km",
			image: "/paris.webp",
		},
		{
			name: "Rome",
			country: "Italie",
			distance: "1100 km",
			image: "/rome.webp",
		},
		{
			name: "Barcelone",
			country: "Espagne",
			distance: "830 km",
			image: "/barcelone.webp",
		},
		{
			name: "Berlin",
			country: "Allemagne",
			distance: "1050 km",
			image: "/berlin.webp",
		},
		{
			name: "Lisbonne",
			country: "Portugal",
			distance: "1450 km",
			image: "/lisbonne.webp",
		},
	];
</script>

<style scoped>
	/* Ajout d'un effet hover pour le lien */
	.router-link-exact-active {
		cursor: pointer;
	}
</style>
