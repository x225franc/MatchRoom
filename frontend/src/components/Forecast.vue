<template>
  <div class="bg-white dark:bg-gray-900 p-6 rounded-lg shadow transition-colors">
    <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-4">📅 Booking Forecast</h3>

    <div class="grid grid-cols-7 gap-3 text-center text-sm text-gray-600 dark:text-gray-300">
      <div
        v-for="(day, index) in forecast"
        :key="index"
        class="flex flex-col items-center"
      >
        <div class="font-medium text-gray-700 dark:text-white">{{ day.day }}</div>
        <div
          class="w-8 h-24 bg-gray-200 dark:bg-gray-700 rounded-lg relative overflow-hidden mt-1"
        >
          <div
            :style="{ height: `${day.rooms * 10}%` }"
            :class="[
              'absolute bottom-0 w-full transition-all duration-500',
              day.rooms >= 6 ? 'bg-green-500' : day.rooms >= 4 ? 'bg-yellow-400' : 'bg-red-400'
            ]"
          ></div>
        </div>
        <div class="mt-1 text-xs text-gray-500 dark:text-gray-400">{{ day.rooms }} rooms</div>
      </div>
    </div>

    <div
      v-if="showSuggestion"
      class="mt-6 p-4 bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-300 rounded text-sm"
    >
      💡 <strong>Suggestion:</strong> Offer a 20% discount on unsold rooms for Friday.
    </div>
  </div>
</template>
  
  <script setup>
  const forecast = [
    { day: 'Mon', rooms: 4 },
    { day: 'Tue', rooms: 6 },
    { day: 'Wed', rooms: 3 },
    { day: 'Thu', rooms: 5 },
    { day: 'Fri', rooms: 2 },
    { day: 'Sat', rooms: 7 },
    { day: 'Sun', rooms: 8 }
  ]
  
  const showSuggestion = forecast.find(d => d.day === 'Fri')?.rooms < 5
  </script>
  