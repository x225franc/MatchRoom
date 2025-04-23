<template>
    <div class="bg-white dark:bg-gray-900 p-6 rounded-lg shadow transition-colors duration-300">
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">🧾 Recent Bookings</h3>
  
      <ul class="space-y-4">
        <li
          v-for="(guest, index) in displayedBookings"
          :key="index"
          class="border-b pb-4 border-gray-200 dark:border-gray-700 transition-colors"
        >
          <div class="flex items-center justify-between">
            <div class="text-sm">
              <p class="font-medium text-gray-900 dark:text-white">{{ guest.name }}</p>
              <p class="text-gray-500 dark:text-gray-400">{{ guest.roomType }}</p>
            </div>
            <div class="text-right text-sm text-gray-600 dark:text-gray-400">
              <p>{{ guest.checkIn }}</p>
              <p class="text-xs italic text-gray-400 dark:text-gray-500">
                {{ guest.device }} — {{ guest.nights }} nights
              </p>
            </div>
          </div>
          <div class="text-right text-sm font-semibold text-green-600 dark:text-green-400">
            €{{ guest.price }}
          </div>
        </li>
      </ul>
  
      <div class="flex justify-end mt-4">
        <button
          @click="showAll = !showAll"
          class="text-sm text-blue-600 dark:text-blue-400 hover:underline transition"
        >
          {{ showAll ? 'Afficher moins' : 'Afficher plus' }}
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
  
  const showAll = ref(false)
  
  const bookings = [
    { name: 'John Smith', roomType: 'Suite', checkIn: '22 Apr 2025', nights: 2, price: 480, device: 'Mobile' },
    { name: 'Anna Johnson', roomType: 'Deluxe', checkIn: '21 Apr 2025', nights: 1, price: 240, device: 'Desktop' },
    { name: 'Carlos Méndez', roomType: 'Junior Suite', checkIn: '20 Apr 2025', nights: 3, price: 720, device: 'Mobile' },
    { name: 'Mei Ling', roomType: 'Deluxe', checkIn: '19 Apr 2025', nights: 1, price: 220, device: 'Mobile' },
    { name: 'Louis Dupont', roomType: 'Suite', checkIn: '18 Apr 2025', nights: 2, price: 500, device: 'Desktop' },
    { name: 'Elena Rossi', roomType: 'Junior Suite', checkIn: '17 Apr 2025', nights: 1, price: 250, device: 'Mobile' }
  ]
  
  const displayedBookings = computed(() =>
    showAll.value ? bookings : bookings.slice(0, 3)
  )
  </script>
  