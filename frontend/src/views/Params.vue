<template>
    <div class="bg-white dark:bg-neutral-800 w-full h-full">
      <div class="max-w-md mx-auto p-4 space-y-6">
        
        <div class="dark:bg-neutral-100 bg-neutral-900 rounded-xl p-4 mt-6">
          <div class="flex items-center justify-between dark:text-gray-800 text-gray-100 mb-4">
            <button @click="prevMonth" class="dark:hover:bg-gray-200 hover:bg-gray-700 p-2 rounded"><</button>
            <div class="font-semibold">{{ monthNames[currentMonth] }} {{ currentYear }}</div>
            <button @click="nextMonth" class="dark:hover:bg-gray-200 hover:bg-gray-700 p-2 rounded">></button>
          </div>
          <div class="grid grid-cols-7 gap-2 text-center dark:text-gray-800 text-gray-200 text-sm">
            <div v-for="day in weekDays" :key="day">{{ day }}</div>
          </div>
          <div class="grid grid-cols-7 gap-2 text-center mt-2 dark:text-gray-800 text-gray-100">
            <div v-for="day in blankDays" :key="`b-${day}`" />
            <div
              v-for="day in daysInMonth"
              :key="day"
              @click="selectDate(day)"
              :class="['py-2 cursor-pointer', dayClass(day)]"
            >
              {{ day }}
            </div>
          </div>
        </div>
  
        <div class="dark:bg-neutral-100 bg-neutral-900 rounded-xl p-4 space-y-4">
          <div class="flex justify-between items-center dark:text-gray-700 text-gray-100">
            <span>Adultes</span>
            <div class="flex items-center space-x-2">
              <button @click="changeCount('adults', -1)" :disabled="travellers.adults===0" class="p-1 dark:bg-gray-200 bg-gray-700 rounded-full disabled:opacity-50">-</button>
              <span>{{ travellers.adults }}</span>
              <button @click="changeCount('adults', 1)" class="p-1 dark:bg-gray-200 bg-gray-700 rounded-full">+</button>
            </div>
          </div>
          <div class="flex justify-between items-center dark:text-gray-700 text-gray-100">
            <span>Enfants</span>
            <div class="flex items-center space-x-2">
              <button @click="changeCount('children', -1)" :disabled="travellers.children===0" class="p-1 dark:bg-gray-200 bg-gray-700 rounded-full disabled:opacity-50">-</button>
              <span>{{ travellers.children }}</span>
              <button @click="changeCount('children', 1)" class="p-1 dark:bg-gray-200 bg-gray-700 rounded-full">+</button>
            </div>
          </div>
          <div class="flex justify-between items-center dark:text-gray-500 text-gray-300">
            <div>
              <span>Bébés</span><br>
              <small class="text-xs">- de 2 ans</small>
            </div>
            <div class="flex items-center space-x-2">
              <button @click="changeCount('infants', -1)" :disabled="travellers.infants===0" class="p-1 dark:bg-gray-200 bg-gray-700 rounded-full disabled:opacity-50">-</button>
              <span>{{ travellers.infants }}</span>
              <button @click="changeCount('infants', 1)" class="p-1 dark:bg-gray-200 bg-gray-700 rounded-full">+</button>
            </div>
          </div>
        </div>
  
        <div class="flex justify-between items-center">
          <button @click="reset" class="text-gray-500 dark:text-gray-300">Tout effacer</button>
          <button
            @click="search"
            :disabled="!canSearch"
            class="px-4 py-2 rounded bg-yellow-500 disabled:opacity-50 text-white"
          >
            Rechercher
          </button>
        </div>
      </div>
    </div>  
  </template>
<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// Route & navigation
const route = useRoute()
const router = useRouter()
const city = route.params.city // récupère le paramètre dynamique

// Date logic
const today = new Date()
const currentMonth = ref(today.getMonth())
const currentYear = ref(today.getFullYear())
const dateFrom = ref(null)
const dateTo = ref(null)

const monthNames = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"]
const weekDays = ["Lun","Mar","Mer","Jeu","Ven","Sam","Dim"]

const daysInMonth = computed(() => {
  const d = new Date(currentYear.value, currentMonth.value + 1, 0)
  return Array.from({ length: d.getDate() }, (_, i) => i + 1)
})
const blankDays = computed(() => {
  const firstDay = new Date(currentYear.value, currentMonth.value, 1).getDay()
  const blanks = (firstDay + 6) % 7
  return Array.from({ length: blanks })
})

function prevMonth() {
  if (currentMonth.value === 0) { currentMonth.value = 11; currentYear.value-- }
  else currentMonth.value--
}
function nextMonth() {
  if (currentMonth.value === 11) { currentMonth.value = 0; currentYear.value++ }
  else currentMonth.value++
}

function selectDate(day) {
  const selected = new Date(currentYear.value, currentMonth.value, day)
  if (!dateFrom.value || (dateFrom.value && dateTo.value)) {
    dateFrom.value = selected
    dateTo.value = null
  } else if (selected < dateFrom.value) {
    dateTo.value = dateFrom.value
    dateFrom.value = selected
  } else {
    dateTo.value = selected
  }
}

function dayClass(day) {
  const d = new Date(currentYear.value, currentMonth.value, day)
  const classes = []
  if (dateFrom.value && dateTo.value && d >= dateFrom.value && d <= dateTo.value) {
    classes.push('bg-yellow-600')
    if (d.getTime() === dateFrom.value.getTime()) {
      classes.push('rounded-l-full')
    } else if (d.getTime() === dateTo.value.getTime()) {
      classes.push('rounded-r-full')
    }
  } else if (dateFrom.value && !dateTo.value && d.getTime() === dateFrom.value.getTime()) {
    classes.push('bg-yellow-400', 'rounded-full')
  }
  return classes.join(' ')
}

function formatted(date) {
  const dd = String(date.getDate()).padStart(2, '0')
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  return `${dd}/${mm}`
}

// Travellers logic
const travellers = ref({ adults: 0, children: 0, infants: 0 })
const changeCount = (type, delta) => {
  travellers.value[type] = Math.max(0, travellers.value[type] + delta)
}
const totalTravellers = computed(() => travellers.value.adults + travellers.value.children + travellers.value.infants)

// Actions
const canSearch = computed(() => totalTravellers.value > 0 && dateFrom.value && dateTo.value)

function reset() {
  dateFrom.value = null
  dateTo.value = null
  travellers.value = { adults: 0, children: 0, infants: 0 }
}

function search() {
  if (canSearch.value) {
    router.push({
      name: 'Swipe',
      params: { city }, // conserve le paramètre city
      query: {
        people: totalTravellers.value,
        from: formatted(dateFrom.value),
        to: formatted(dateTo.value)
      }
    })
  }
}
</script>
