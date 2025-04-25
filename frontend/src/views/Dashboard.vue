<template>
	<div class="flex flex-col md:flex-row">
		<aside
			class="w-full md:w-16 lg:w-64 h-16 md:h-auto bg-white dark:bg-gray-900 flex md:flex-col items-center justify-between md:justify-start px-4 md:px-0 py-2 md:py-6 space-x-6 md:space-x-0 md:space-y-6 shadow-md transition-all"
		>
			<div class="hidden lg:block px-6 py-4">
				<h1 class="font-bold text-xl">MatchRoom Hotelier</h1>
			</div>

			<button
				@click="toggleDarkMode"
				class="w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center text-white"
				:class="isDark ? 'bg-white text-black' : 'bg-white text-yellow-500'"
				:title="isDark ? 'Mode sombre activé' : 'Mode clair activé'"
			>
				<span v-if="isDark">🌙</span>
				<span v-else>☀️</span>
			</button>

			<div class="flex flex-col items-center lg:items-stretch space-y-4 w-full">
				<router-link
					to="/hotelier/dashboard"
					class="flex items-center justify-center lg:justify-start px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
					active-class="bg-yellow-100 text-yellow-700 dark:bg-gray-800"
				>
					<span class="text-xl">🏠</span>
					<span class="hidden lg:block ml-3">Tableau de bord</span>
				</router-link>

				<router-link
					to="/hotelier/hotels"
					class="flex items-center justify-center lg:justify-start px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
					active-class="bg-yellow-100 text-yellow-700 dark:bg-gray-800"
				>
					<span class="text-xl">🏨</span>
					<span class="hidden lg:block ml-3">Mes établissements</span>
				</router-link>

				<router-link
					to="/hotelier/rooms"
					class="flex items-center justify-center lg:justify-start px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
					active-class="bg-yellow-100 text-yellow-700 dark:bg-gray-800"
				>
					<span class="text-xl">🛏️</span>
					<span class="hidden lg:block ml-3">Chambres</span>
				</router-link>

				<router-link
					to="/hotelier/profile"
					class="flex items-center justify-center lg:justify-start px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
					active-class="bg-yellow-100 text-yellow-700 dark:bg-gray-800"
				>
					<span class="text-xl">👤</span>
					<span class="hidden lg:block ml-3">Profil</span>
				</router-link>

				<button
					@click="logout"
					class="flex items-center justify-center lg:justify-start px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors w-full text-left"
				>
					<span class="text-xl">🚪</span>
					<span class="hidden lg:block ml-3">Déconnexion</span>
				</button>
			</div>
		</aside>

		<div
			class="flex-1 p-6 bg-gray-100 dark:bg-gray-950 min-h-screen transition-colors"
		>
			<!-- Greeting -->
			<div class="mb-6">
				<h1 class="text-2xl font-bold">Bienvenue, {{ hotelierName }}</h1>
				<p class="text-gray-600 dark:text-gray-400">Voici un aperçu de votre activité</p>
			</div>

			<div class="w-full mb-6">
				<RecentBookings :reservations="recentBookings" />
			</div>

			<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
				<LineChart :chartData="bookingsChartData" />
				<RoomTypes :roomTypeData="roomTypes" />
			</div>

			<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
				<div
					class="bg-white dark:bg-gray-900 rounded-lg shadow p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 transition-colors"
				>
					<StatCard title="Chambres" :value="stats.totalRooms" icon="🛏️" />
					<StatCard title="Revenus" :value="formatCurrency(stats.revenue)" icon="💶" />
					<StatCard title="Taux d'occupation" :value="stats.occupancyRate + '%'" icon="📈" />
					<StatCard title="Réservations" :value="stats.reservations" icon="🔁" />
				</div>
				<Forecast :forecastData="forecastData" />
			</div>
		</div>
	</div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import StatCard from "@/components/StatCard.vue";
import LineChart from "@/components/LineChart.vue";
import RecentBookings from "@/components/RecentBookings.vue";
import RoomTypes from "@/components/RoomTypes.vue";
import Forecast from "@/components/Forecast.vue";

export default {
	components: {
		StatCard,
		LineChart,
		RecentBookings,
		RoomTypes,
		Forecast
	},
	
	props: {
		isDark: Boolean,
		toggleDarkMode: Function
	},

	setup(props) {
		const router = useRouter();
		const hotelierName = ref('Martin Dupont');
		const stats = ref({
			totalRooms: 24,
			revenue: 12450,
			occupancyRate: 78,
			reservations: 36
		});

		const recentBookings = ref([
			{ id: 1, guestName: 'Sophie Martin', roomType: 'Suite Deluxe', checkIn: '2025-04-27', checkOut: '2025-04-30', status: 'confirmed', total: 750 },
			{ id: 2, guestName: 'Thomas Bernard', roomType: 'Chambre Double', checkIn: '2025-05-01', checkOut: '2025-05-03', status: 'pending', total: 320 },
			{ id: 3, guestName: 'Emma Petit', roomType: 'Suite Junior', checkIn: '2025-04-30', checkOut: '2025-05-02', status: 'confirmed', total: 520 },
			{ id: 4, guestName: 'Lucas Durand', roomType: 'Chambre Simple', checkIn: '2025-05-02', checkOut: '2025-05-05', status: 'pending', total: 380 },
			{ id: 5, guestName: 'Léa Moreau', roomType: 'Suite Présidentielle', checkIn: '2025-05-10', checkOut: '2025-05-15', status: 'confirmed', total: 1800 }
		]);

		const bookingsChartData = ref({
			labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'],
			datasets: [
				{
					label: 'Réservations 2025',
					data: [28, 32, 36, 42, 48, 52, 58, 62, 48, 38, 32, 36],
					borderColor: '#FFD700',
					backgroundColor: 'rgba(255, 215, 0, 0.2)'
				},
				{
					label: 'Réservations 2024',
					data: [22, 25, 30, 35, 40, 45, 50, 55, 42, 32, 28, 30],
					borderColor: '#4682B4',
					backgroundColor: 'rgba(70, 130, 180, 0.2)'
				}
			]
		});

		const roomTypes = ref([
			{ name: 'Chambre Simple', occupancy: 65, color: '#4682B4' },
			{ name: 'Chambre Double', occupancy: 82, color: '#FFD700' },
			{ name: 'Suite Junior', occupancy: 58, color: '#32CD32' },
			{ name: 'Suite Deluxe', occupancy: 73, color: '#FF6347' },
			{ name: 'Suite Présidentielle', occupancy: 42, color: '#9370DB' }
		]);

		const forecastData = ref([
			{ date: '26 Avr', occupancy: 85, revenue: 4200 },
			{ date: '27 Avr', occupancy: 92, revenue: 4650 },
			{ date: '28 Avr', occupancy: 78, revenue: 3950 },
			{ date: '29 Avr', occupancy: 72, revenue: 3600 },
			{ date: '30 Avr', occupancy: 89, revenue: 4450 },
			{ date: '1 Mai', occupancy: 95, revenue: 5100 },
			{ date: '2 Mai', occupancy: 97, revenue: 5250 }
		]);

		const formatCurrency = (value) => {
			return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' })
				.format(value)
				.replace(',00', '');
		};

		const logout = () => {
			// Logique de déconnexion
			localStorage.removeItem('token');
			localStorage.removeItem('userRole');
			router.push('/signin');
		};

		onMounted(() => {
			// Ici vous pourriez charger les données réelles
			console.log('Dashboard monté');
		});

		return {
			hotelierName,
			stats,
			recentBookings,
			bookingsChartData,
			roomTypes,
			forecastData,
			formatCurrency,
			logout
		};
	}
};
</script>
