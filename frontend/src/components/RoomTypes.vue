<template>
  <div class="bg-white dark:bg-gray-900 p-4 rounded-lg shadow transition-colors">
    <h3 class="text-lg font-semibold text-black dark:text-white mb-4 text-center">Room Types</h3>
    <div class="w-full flex justify-center">
      <canvas ref="typeChart" class="max-h-60 max-w-xs"></canvas>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { Chart, registerables } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'

Chart.register(...registerables, ChartDataLabels)

const typeChart = ref(null)
let chartInstance = null
let observer = null

const createChart = (isDark) => {
  if (chartInstance) chartInstance.destroy()

  chartInstance = new Chart(typeChart.value, {
    type: 'doughnut',
    data: {
      labels: ['Suite', 'Deluxe', 'Junior Suite'],
      datasets: [{
        data: [6, 9, 3],
        backgroundColor: ['#1E40AF', '#F59E0B', '#10B981']
      }]
    },
    options: {
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: isDark ? '#F3F4F6' : '#111827'
          }
        },
        datalabels: {
          color: isDark ? '#FFFFFF' : '#000000',
          font: {
            weight: 'bold',
            size: 14
          },
          formatter: (value) => value
        }
      },
      maintainAspectRatio: false
    },
    plugins: [ChartDataLabels]
  })
}

onMounted(() => {
  const isDark = document.documentElement.classList.contains('dark')
  createChart(isDark)

  observer = new MutationObserver(() => {
    const newDark = document.documentElement.classList.contains('dark')
    createChart(newDark)
  })

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class']
  })
})

onBeforeUnmount(() => {
  if (chartInstance) chartInstance.destroy()
  if (observer) observer.disconnect()
})
</script>
