<template>
  <div class="bg-white dark:bg-gray-900 p-6 rounded-lg shadow transition-colors">
    <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-4">📊 Weekly Performance</h3>
    <canvas ref="chartRef" class="w-full max-h-96"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { Chart, registerables } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'

Chart.register(...registerables, ChartDataLabels)

const chartRef = ref(null)
let chartInstance = null
let observer = null

const buildChart = () => {
  const isDark = document.documentElement.classList.contains('dark')

  if (chartInstance) {
    chartInstance.destroy()
    chartInstance = null
  }

  chartInstance = new Chart(chartRef.value, {
    type: 'bar',
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          label: 'Rooms Sold',
          data: [2, 4, 6, 5, 7, 8, 9],
          backgroundColor: '#3B82F6',
          yAxisID: 'yRooms',
          datalabels: {
            anchor: 'end',
            align: 'start',
            offset: -18,
            color: isDark ? '#93C5FD' : '#1E3A8A',
            font: { weight: 'bold' },
            formatter: (value) => value
          }
        },
        {
          label: 'Revenue',
          data: [240, 480, 720, 600, 840, 960, 1080],
          backgroundColor: '#10B981',
          yAxisID: 'yRevenue',
          datalabels: {
            anchor: 'end',
            align: 'start',
            offset: -20,
            color: isDark ? '#6EE7B7' : '#065F46',
            font: { weight: 'bold' },
            formatter: (value) => `${value} €`
          }
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            usePointStyle: true,
            boxWidth: 10,
            color: isDark ? '#E5E7EB' : '#1F2937'
          }
        },
        tooltip: {
          mode: 'index',
          intersect: false
        },
        datalabels: {
          clamp: true
        }
      },
      scales: {
        yRooms: {
          type: 'linear',
          position: 'left',
          suggestedMax: 12,
          ticks: { display: false },
          grid: { drawOnChartArea: false }
        },
        yRevenue: {
          type: 'linear',
          position: 'right',
          suggestedMax: 1200,
          ticks: { display: false },
          grid: {
            drawTicks: false,
            color: isDark ? '#374151' : '#e5e7eb'
          }
        },
        x: {
          grid: { display: false },
          ticks: {
            color: isDark ? '#D1D5DB' : '#4B5563'
          }
        }
      }
    },
    plugins: [ChartDataLabels]
  })
}

onMounted(() => {
  buildChart()

  observer = new MutationObserver(() => {
    buildChart()
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
