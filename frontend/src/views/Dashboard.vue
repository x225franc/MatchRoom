<template>
  <div class="p-6 bg-gray-100 dark:bg-gray-950 min-h-screen transition-colors">
    
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
</template>
  
    
    <script setup>
    import Header from '@/components/Header.vue'
    import Footer from '@/components/Footer.vue'
    import StatCard from '@/components/StatCard.vue'
    import LineChart from '@/components/LineChart.vue'
    import RecentBookings from '@/components/RecentBookings.vue'
    import RoomTypes from '@/components/RoomTypes.vue' 
    import Forecast from '@/components/Forecast.vue'
    </script>
    