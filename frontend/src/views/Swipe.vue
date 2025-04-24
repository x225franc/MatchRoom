<template>
    <div class="w-full h-screen flex items-center justify-center bg-white dark:bg-neutral-800 p-6">
      <div ref="cardsContainer" class="relative w-96 h-[40rem]">
        <div
          v-for="(room, idx) in rooms"
          :key="room.id"
          class="card absolute top-0 left-0 bg-white dark:bg-neutral-900 rounded-2xl shadow-xl overflow-hidden w-full h-full flex flex-col"
          :style="{
            transform: cardStyles[idx].transform,
            transition: cardStyles[idx].transition,
            zIndex: rooms.length - idx
          }"
          @pointerdown="startDrag(idx, $event)"
          @pointermove="onDrag"
          @pointerup="endDrag(idx, $event)"
          @pointercancel="endDrag(idx, $event)"
        >
          <!-- Image avec prix -->
          <div class="relative h-44 shrink-0">
            <img :src="room.image" :alt="room.name" class="w-full h-full object-cover" />
            <div class="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-sm px-3 py-1 rounded-lg">
              <span class="font-semibold">{{ room.price }}</span>
              <div class="text-xs opacity-80">Taxe et frais compris</div>
            </div>
          </div>
  
          <!-- Infos -->
          <div class="p-4 space-y-2 flex-grow overflow-hidden">
            <h2 class="text-lg font-semibold text-black dark:text-white">{{ room.name }}</h2>
            <div class="flex items-center text-yellow-500 space-x-1">
              <template v-for="i in 5">
                <span v-if="i <= Math.round(room.rating)">★</span>
                <span v-else class="text-gray-300">★</span>
              </template>
              <span class="text-sm text-gray-500 ml-2">📍 {{ room.address }}</span>
            </div>
            <p class="text-sm text-gray-700 dark:text-gray-300 max-h-24 overflow-auto leading-relaxed">
              {{ room.description }} — Lorem ipsum dolor sit amet...
            </p>
  
            <!-- Google Map -->
            <div class="!mt-8 rounded-md overflow-hidden w-full h-40">
              <iframe
                class="w-full h-full border-0"
                loading="lazy"
                allowfullscreen
                referrerpolicy="no-referrer-when-downgrade"
                :src="`https://www.google.com/maps?q=${encodeURIComponent(room.address)}&output=embed`"
              ></iframe>
            </div>
          </div>
  
          <!-- Boutons swipe -->
          <div class="flex justify-around items-center py-5 shrink-0 gap-10">
            <button
              @pointerdown.stop
              @click="handleSwipe('left')"
              class="w-16 h-16 rounded-full bg-neutral-900 text-white text-4xl flex items-center justify-center hover:scale-105 hover:-translate-y-1 transition-transform"
              title="Refuser"
            >
              <!-- Icon -->
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M28.9375 3.0625L3.0625 28.9375M3.0625 3.0625L28.9375 28.9375" stroke="#F8F8F8" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
  
            <button
              @pointerdown.stop
              @click="handleSwipe('right')"
              class="w-16 h-16 rounded-full bg-[#D9AC73] text-white text-4xl flex items-center justify-center hover:scale-105 hover:-translate-y-1 transition-transform"
              title="Accepter"
            >
              <!-- Icon -->
              <svg width="35" height="26" viewBox="0 0 35 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 13L13 22L31 4" stroke="white" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
  
          <!-- Feedback swipe -->
          <div
            v-if="swipeStatus[idx]"
            class="absolute inset-0 flex items-center justify-center text-4xl font-bold text-white transition-opacity duration-300"
            :class="swipeStatus[idx] === 'right' ? 'bg-green-500 bg-opacity-50' : 'bg-red-500 bg-opacity-50'"
          >
            {{ swipeStatus[idx] === 'right' ? '👍' : '👎' }}
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive, onMounted, nextTick } from 'vue'
  
  const cardsContainer = ref(null)
  const props = defineProps({ city: String })
  const rooms = ref([])
  const swipeStatus = ref([])
  const cardStyles = reactive([])
  
  let draggingIdx = null
  let startX = 0, startY = 0
  let rafId = null
  
  onMounted(async () => {
    rooms.value = fetchRoomsForCity(props.city)
    swipeStatus.value = rooms.value.map(() => null)
    rooms.value.forEach(() => cardStyles.push({ transform: '', transition: '' }))
    await nextTick()
  })
  
  function startDrag(idx, e) {
    // Ne pas démarrer le drag si c'est un clic sur un bouton
    if (e.target.closest('button')) return
    draggingIdx = idx
    startX = e.clientX
    startY = e.clientY
    cardStyles[idx].transition = ''
    e.currentTarget.setPointerCapture(e.pointerId)
  }
  
  function onDrag(e) {
    if (draggingIdx === null) return
    if (rafId) cancelAnimationFrame(rafId)
    rafId = requestAnimationFrame(() => {
      const dx = e.clientX - startX
      const dy = e.clientY - startY
      const rot = dx / 10
      cardStyles[draggingIdx].transform = `translate(${dx}px, ${dy}px) rotate(${rot}deg)`
    })
  }
  
  /**
   * Anime et retire la carte à l'écran
   * @param {number} idx - index de la carte
   * @param {'left'|'right'} direction
   * @param {number} rot - angle de rotation en degrés
   */
  function swipeCard(idx, direction, rot = 15) {
    swipeStatus.value[idx] = direction
    const cardEl = cardsContainer.value.children[idx]
    const exitX = (direction === 'right' ? 1 : -1) * cardEl.offsetWidth * 4
    cardStyles[idx].transition = 'transform 0.25s ease-out'
    cardStyles[idx].transform = `translate(${exitX}px, 0) rotate(${direction === 'right' ? rot : -rot}deg)`
    setTimeout(() => {
      rooms.value.splice(idx, 1)
      swipeStatus.value.splice(idx, 1)
      cardStyles.splice(idx, 1)
    }, 300)
  }
  
  function endDrag(idx, e) {
    if (draggingIdx !== idx) return
    if (rafId) cancelAnimationFrame(rafId)
    e.currentTarget.releasePointerCapture(e.pointerId)
  
    const style = cardStyles[idx]
    style.transition = 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)'
  
    const match = style.transform.match(/translate\((-?\d+\.?\d*)px/)
    const tx = match ? parseFloat(match[1]) : 0
    const threshold = e.currentTarget.offsetWidth * 0.3
  
    if (tx > threshold) {
      swipeCard(idx, 'right', tx / 10)
    } else if (tx < -threshold) {
      swipeCard(idx, 'left', tx / 10)
    } else {
      style.transform = ''
      swipeStatus.value[idx] = null
    }
  
    draggingIdx = null
  }
  
  function handleSwipe(direction) {
    if (!rooms.value.length) return
    swipeCard(0, direction)
  }
  
  function fetchRoomsForCity(city) {
    const sample = {
      Paris: [
        { id: 1, name: 'Chambre Standard', address: '5 Rue de Paris, 75001 Paris, France', description: 'Confort et charme', price: '80€/nuit', rating: 4.2, image: '/rooms/example.jpg' },
        { id: 2, name: 'Suite Luxe', address: '10 Avenue des Champs-Élysées, 75008 Paris, France', description: 'Vue sur la Tour Eiffel', price: '200€/nuit', rating: 4.8, image: '/rooms/example.jpg' }
      ],
      Rome: [
        { id: 3, name: 'Chambre Romantique', address: 'Piazza del Colosseo, 1, 00184 Roma RM, Italie', description: 'Près du Colisée', price: '90€/nuit', rating: 4.5, image: '/rooms/example.jpg' },
        { id: 4, name: 'Junior Suite', address: 'Via del Corso, 00186 Roma RM, Italie', description: 'Balcon privé', price: '150€/nuit', rating: 4.7, image: '/rooms/example.jpg' }
      ],
      Rotterdam: [
        { id: 5, name: 'Chambre Contemporaine', address: 'Coolsingel 1, 3012 AA Rotterdam, Pays-Bas', description: 'Centre ville', price: '75€/nuit', rating: 4.1, image: '/rooms/example.jpg' },
        { id: 6, name: 'Suite Moderne', address: 'Wilhelminakade 705, 3072 AD Rotterdam, Pays-Bas', description: 'Vue sur le port', price: '180€/nuit', rating: 4.6, image: '/rooms/example.jpg' }
      ]
    }
    return sample[city] || []
  }
  </script>
  
  <style scoped>
  .card {
    touch-action: none;
  }
  </style>
  