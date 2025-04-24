<template>
  <div class="bg-white dark:bg-gray-900 p-4 rounded-lg shadow transition-colors">
    <h3 class="text-lg font-semibold text-black dark:text-white mb-4 text-center">Booking Devices</h3>
    <div class="w-full flex justify-center">
      <canvas ref="deviceChart" class="max-h-60 max-w-xs"></canvas>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

const deviceChart = ref(null)

onMounted(() => {
  new Chart(deviceChart.value, {
    type: 'doughnut',
    data: {
      labels: ['Mobile', 'Desktop'],
      datasets: [{
        data: [60, 40],
        backgroundColor: ['#6D28D9', '#3B82F6']
      }]
    },
    options: {
      plugins: {
        legend: { position: 'bottom' }
      },
      maintainAspectRatio: false
    }
  })
})
</script>
