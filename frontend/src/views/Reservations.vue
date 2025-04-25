<template>
  <div class="min-h-screen bg-white">
    <div class="flex justify-around py-4">
      <button class="bg-black text-white px-6 py-2 rounded-full">
        En cours
      </button>
      <button class="border border-black text-black px-6 py-2 rounded-full">
        Accepter
      </button>
      <button class="border border-black text-black px-6 py-2 rounded-full">
        Refus
      </button>
    </div>

    <div class="space-y-4 px-4 pb-10" v-if="!selectedHotel">
      <div
        v-for="(hotel, index) in hotels"
        :key="index"
        class="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer"
        @click="selectHotel(hotel)"
      >
        <div class="relative">
          <div
            class="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-black/80 to-transparent z-10 pointer-events-none"
          ></div>

          <img :src="hotel.image" class="w-full h-52 object-cover" />

          <span
            v-if="hotel.alert"
            class="absolute top-2 right-2 z-20 rounded-full p-2"
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.953 4.25C11.636 4.25 9.835 4.25 8.433 4.4C7.015 4.553 5.892 4.87 4.996 5.586C4.076 6.322 3.646 7.279 3.443 8.486C3.25 9.638 3.25 11.104 3.25 12.932V13.115C3.25 14.897 3.25 16.13 3.45 17.049C3.558 17.544 3.728 17.974 3.995 18.372C4.259 18.764 4.595 19.094 4.996 19.414C5.627 19.919 6.371 20.224 7.25 20.414V23C7.25012 23.1314 7.28475 23.2605 7.35044 23.3743C7.41613 23.4881 7.51057 23.5826 7.62429 23.6484C7.73802 23.7143 7.86704 23.7491 7.99844 23.7493C8.12984 23.7496 8.259 23.7153 8.373 23.65C8.959 23.315 9.478 22.95 9.953 22.606L10.257 22.385C10.5953 22.1318 10.9407 21.8883 11.293 21.655C12.137 21.107 12.943 20.75 14 20.75H14.047C16.364 20.75 18.165 20.75 19.567 20.6C20.985 20.447 22.108 20.13 23.004 19.414C23.404 19.094 23.741 18.764 24.004 18.372C24.272 17.974 24.442 17.544 24.55 17.049C24.75 16.13 24.75 14.897 24.75 13.115V12.932C24.75 11.104 24.75 9.638 24.557 8.487C24.354 7.279 23.924 6.322 23.004 5.586C22.108 4.869 20.985 4.553 19.567 4.401C18.165 4.25 16.364 4.25 14.047 4.25H13.953Z"
                fill="#BAA089"
              />
              <path
                d="M13.75 7C13.9481 7.00259 14.1374 7.08244 14.2775 7.22253C14.4176 7.36263 14.4974 7.55189 14.5 7.75L14.5 14.75C14.5 14.9489 14.421 15.1397 14.2803 15.2803C14.1397 15.421 13.9489 15.5 13.75 15.5C13.5511 15.5 13.3603 15.421 13.2197 15.2803C13.079 15.1397 13 14.9489 13 14.75L13 7.75C13.0026 7.55189 13.0824 7.36263 13.2225 7.22253C13.3626 7.08244 13.5519 7.00259 13.75 7ZM13.75 16.5C13.9481 16.5026 14.1374 16.5824 14.2775 16.7225C14.4176 16.8626 14.4974 17.0519 14.5 17.25L14.5 17.75C14.5 17.9489 14.421 18.1397 14.2803 18.2803C14.1397 18.421 13.9489 18.5 13.75 18.5C13.5511 18.5 13.3603 18.421 13.2197 18.2803C13.079 18.1397 13 17.9489 13 17.75L13 17.25C13.0026 17.0519 13.0824 16.8626 13.2225 16.7225C13.3626 16.5824 13.5519 16.5026 13.75 16.5Z"
                fill="#F8F8F8"
              />
            </svg>
          </span>

          <span
            v-else
            class="absolute top-2 right-2 z-20 rounded-full p-2 shadow-md text-gray-800"
          >
            <svg
              width="35"
              height="35"
              viewBox="0 0 24 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="12" r="10.5" fill="black" />
              <path
                d="M11.9999 0.333496C18.4434 0.333496 23.6666 5.55666 23.6666 12.0002C23.6666 18.4437 18.4434 23.6668 11.9999 23.6668C5.55642 23.6668 0.333252 18.4437 0.333252 12.0002C0.333252 5.55666 5.55642 0.333496 11.9999 0.333496ZM11.9999 5.00016C11.6905 5.00016 11.3938 5.12308 11.175 5.34187C10.9562 5.56066 10.8333 5.85741 10.8333 6.16683V12.0002C10.8333 12.3096 10.9563 12.6063 11.1751 12.825L14.6751 16.325C14.8951 16.5375 15.1898 16.6551 15.4957 16.6525C15.8016 16.6498 16.0942 16.5271 16.3105 16.3108C16.5269 16.0945 16.6495 15.8019 16.6522 15.496C16.6549 15.1901 16.5373 14.8954 16.3248 14.6753L13.1666 11.5172V6.16683C13.1666 5.85741 13.0437 5.56066 12.8249 5.34187C12.6061 5.12308 12.3093 5.00016 11.9999 5.00016Z"
                fill="#F0BF6C"
              />
            </svg>
          </span>

          <div
            class="absolute bottom-2 right-2 bg-black text-white text-sm px-3 py-1 rounded-lg z-20"
          >
            230 /nuit €
            <div class="text-xs text-gray-300">Taxe et frais compris</div>
          </div>
        </div>

        <div class="p-4">
          <h3 class="font-semibold text-lg">Hotel de paris</h3>
          <div class="flex text-yellow-400 text-sm mb-2">
            <span v-for="i in hotel.rating" :key="i">★</span>
          </div>
          <div class="text-gray-500 text-sm flex items-center space-x-2">
            <span>📍 3,4km</span>
            <span>Paris, 64 Rue de Ranelagh</span>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="px-4 py-6 space-y-4">
      <div class="relative">
        <img
          :src="selectedHotel.image"
          class="w-full h-52 object-cover rounded-xl"
        />
        <div
          class="absolute bottom-2 right-2 bg-black text-white text-sm px-3 py-1 rounded-lg"
        >
          230 /nuit €
          <div class="text-xs text-gray-300">Taxe et frais compris</div>
        </div>
      </div>

      <h2 class="text-xl font-semibold">Hotel de paris</h2>
      <div class="text-yellow-400 text-sm mb-2">
        <span v-for="i in selectedHotel.rating" :key="i">★</span>
      </div>
      <div class="text-gray-500 text-sm flex items-center space-x-2">
        <span>📍 3,4km</span>
        <span>Paris, 32 Rue De Rivoli</span>
      </div>

      <div class="border-t pt-4 space-y-3">
        <h3 class="font-semibold text-lg">Contre proposition</h3>

        <div class="flex justify-end">
          <div class="bg-orange-100 text-orange-800 p-3 rounded-lg max-w-[75%]">
            Prix négocié du client à 210 €
          </div>
        </div>

        <div class="flex justify-start items-start space-x-2">
          <img
            src="/rooms/example.jpg"
            class="w-8 h-8 rounded-full object-cover"
          />
          <div class="bg-gray-100 text-gray-800 p-3 rounded-lg max-w-[75%]">
            L’hôtelier vous propose cette chambre pour 220 €
          </div>
        </div>

        <div class="flex justify-around items-center py-5 shrink-0 gap-10">
          <button
            @pointerdown.stop
            @click="handleSwipe('left')"
            class="w-16 h-16 rounded-full bg-neutral-900 text-white text-4xl flex items-center justify-center hover:scale-105 hover:-translate-y-1 transition-transform"
            title="Refuser"
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path
                d="M28.9375 3.0625L3.0625 28.9375M3.0625 3.0625L28.9375 28.9375"
                stroke="#F8F8F8"
                stroke-width="5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>

          <button
            @pointerdown.stop
            @click="handleSwipe('right')"
            class="w-16 h-16 rounded-full bg-[#D9AC73] text-white text-4xl flex items-center justify-center hover:scale-105 hover:-translate-y-1 transition-transform"
            title="Accepter"
          >
            <svg width="35" height="26" viewBox="0 0 35 26" fill="none">
              <path
                d="M4 13L13 22L31 4"
                stroke="white"
                stroke-width="7"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>

        <div class="text-center mt-4">
          <button
            class="text-sm underline text-gray-500"
            @click="selectedHotel = null"
          >
            ← Retour
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const hotels = [
  {
    image: "/rooms/example.jpg",
    rating: 4,
    alert: false,
  },
  {
    image: "/rooms/example2.jpg",
    rating: 5,
    alert: true,
  },
];

const selectedHotel = ref(null);

function selectHotel(hotel) {
  selectedHotel.value = hotel;
}

function handleSwipe(direction) {
  if (direction === "left") {
    selectedHotel.value = null;
  } else if (direction === "right") {
    selectedHotel.value = null;
  }
}
</script>
<style scoped>
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.3s ease;
}
.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
