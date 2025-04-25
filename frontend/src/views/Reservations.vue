<template>
  <div class="min-h-screen bg-white">
    <!-- Onglets -->
    <div class="flex justify-around py-4">
      <button class="bg-black text-white px-6 py-2 rounded-full">En cours</button>
      <button class="border border-black text-black px-6 py-2 rounded-full">Accepter</button>
      <button class="border border-black text-black px-6 py-2 rounded-full">Refus</button>
    </div>

    <!-- Cartes hôtels -->
    <div class="space-y-4 px-4 pb-10">
      <div
        v-for="(hotel, index) in hotels"
        :key="index"
        class="bg-white rounded-xl shadow-md overflow-hidden"
      >
        <!-- Image -->
        <div class="relative">
          <img :src="hotel.image" class="w-full h-52 object-cover" />
          <!-- Icône (ex : téléphone / point d’exclamation) -->
          <div class="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md">
            <span v-if="hotel.alert" class="text-yellow-500">!</span>
            <span v-else class="text-gray-800">📞</span>
          </div>
          <!-- Prix -->
          <div class="absolute bottom-2 right-2 bg-black text-white text-sm px-3 py-1 rounded-lg">
            230 /nuit €
            <div class="text-xs text-gray-300">Taxe et frais compris</div>
          </div>
        </div>

        <!-- Détails -->
        <div class="p-4">
          <h3 class="font-semibold text-lg">Hotel de paris</h3>
          <!-- Étoiles -->
          <div class="flex text-yellow-400 text-sm mb-2">
            <span v-for="i in hotel.rating" :key="i">★</span>
          </div>
          <!-- Localisation -->
          <div class="text-gray-500 text-sm flex items-center space-x-2">
            <span>📍 3,4km</span>
            <span>Paris, adresse</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const hotels = [
  {
    image: '/rooms/example.jpg',
    rating: 4,
    alert: false
  },
  {
    image: '/rooms/example2.jpg',
    rating: 5,
    alert: true
  },
  {
    image: '/rooms/example.jpg',
    rating: 3,
    alert: false
  }
]
</script>
