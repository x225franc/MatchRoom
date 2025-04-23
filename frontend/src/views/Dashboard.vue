<template>
  <div class="flex flex-col md:flex-row">
    <aside
      class="w-full md:w-16 h-16 md:h-auto bg-white dark:bg-gray-900 flex md:flex-col items-center justify-between md:justify-start px-4 md:px-0 py-2 md:py-6 space-x-6 md:space-x-0 md:space-y-6 shadow-md transition-all"
    >
      <button
        @click="toggleDarkMode"
        class="w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center text-white"
        :class="isDark ? 'bg-white text-black' : 'bg-white text-yellow-500'"
        :title="isDark ? 'Mode sombre activé' : 'Mode clair activé'"
      >
        <span v-if="isDark">🌙</span>
        <span v-else>☀️</span>
      </button>

      <button class="text-2xl hover:text-blue-500 transition-colors" title="Dashboard">
        🏠
      </button>
      <button class="text-2xl hover:text-blue-500 transition-colors" title="Profil">
        👤
      </button>
      <button class="text-2xl hover:text-blue-500 transition-colors" title="Gestion de taux">
        💹
      </button>
    </aside>

    <div class="flex-1 p-6 bg-gray-100 dark:bg-gray-950 min-h-screen transition-colors">
      <div class="w-full mb-6">
        <RecentBookings />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <LineChart />
        <RoomTypes />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div class="bg-white dark:bg-gray-900 rounded-lg shadow p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 transition-colors">
          <StatCard title="Rooms Sold" value="18" icon="🛏️" />
          <StatCard title="Revenue" value="€4,320" icon="💶" />
          <StatCard title="Avg Rate" value="€240" icon="📈" />
          <StatCard title="Conversion Rate" value="12.4%" icon="🔁" />
        </div>
        <Forecast />
      </div>
    </div>
  </div>
</template>

<script setup>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import StatCard from '@/components/StatCard.vue'
import LineChart from '@/components/LineChart.vue'
import RecentBookings from '@/components/RecentBookings.vue'
import RoomTypes from '@/components/RoomTypes.vue'
import Forecast from '@/components/Forecast.vue'

import DarkModeToggle from '@/components/DarkModeToggle.vue'

defineProps(['isDark', 'toggleDarkMode'])
</script>
