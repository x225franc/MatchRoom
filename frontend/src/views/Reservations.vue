<template>
  <div class="min-h-screen bg-white">
    <div class="flex justify-around py-4 border-b">
      <button
        v-for="filter in filters"
        :key="filter"
        @click="setActiveFilter(filter)"
        :class="[
          'px-6 py-2 rounded-full transition-colors duration-200 ease-in-out',
          activeFilter === filter ? 'bg-black text-white' : 'border border-black text-black hover:bg-gray-100'
        ]"
      >
        {{ filter }}
      </button>
    </div>

    <div class="space-y-4 px-4 pb-10 pt-4" v-if="!selectedHotel">
      <div v-if="isLoading" class="text-center text-gray-500 mt-10">Chargement...</div>
      <div v-else-if="filteredHotels.length === 0" class="text-center text-gray-500 mt-10">
        Aucune réservation trouvée pour "{{ activeFilter }}".
      </div>
      <div v-else v-for="hotel in filteredHotels" :key="hotel.id"
        class="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
        @click="selectHotel(hotel)">
        <div class="relative">
          <div class="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-black/60 to-transparent z-10 pointer-events-none"></div>
          <img :src="hotel.image || '/placeholder.jpg'" @error="onImageError" class="w-full h-52 object-cover" :alt="hotel.name" />
          <span v-if="hotel.alert" class="absolute top-2 right-2 z-20 p-1 rounded-full">
            <svg width="32" height="32" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.953 4.25C11.636 4.25 9.835 4.25 8.433 4.4C7.015 4.553 5.892 4.87 4.996 5.586C4.076 6.322 3.646 7.279 3.443 8.486C3.25 9.638 3.25 11.104 3.25 12.932V13.115C3.25 14.897 3.25 16.13 3.45 17.049C3.558 17.544 3.728 17.974 3.995 18.372C4.259 18.764 4.595 19.094 4.996 19.414C5.627 19.919 6.371 20.224 7.25 20.414V23C7.25012 23.1314 7.28475 23.2605 7.35044 23.3743C7.41613 23.4881 7.51057 23.5826 7.62429 23.6484C7.73802 23.7143 7.86704 23.7491 7.99844 23.7493C8.12984 23.7496 8.259 23.7153 8.373 23.65C8.959 23.315 9.478 22.95 9.953 22.606L10.257 22.385C10.5953 22.1318 10.9407 21.8883 11.293 21.655C12.137 21.107 12.943 20.75 14 20.75H14.047C16.364 20.75 18.165 20.75 19.567 20.6C20.985 20.447 22.108 20.13 23.004 19.414C23.404 19.094 23.741 18.764 24.004 18.372C24.272 17.974 24.442 17.544 24.55 17.049C24.75 16.13 24.75 14.897 24.75 13.115V12.932C24.75 11.104 24.75 9.638 24.557 8.487C24.354 7.279 23.924 6.322 23.004 5.586C22.108 4.869 20.985 4.553 19.567 4.401C18.165 4.25 16.364 4.25 14.047 4.25H13.953Z" fill="#BAA089"/><path d="M13.75 7C13.9481 7.00259 14.1374 7.08244 14.2775 7.22253C14.4176 7.36263 14.4974 7.55189 14.5 7.75L14.5 14.75C14.5 14.9489 14.421 15.1397 14.2803 15.2803C14.1397 15.421 13.9489 15.5 13.75 15.5C13.5511 15.5 13.3603 15.421 13.2197 15.2803C13.079 15.1397 13 14.9489 13 14.75L13 7.75C13.0026 7.55189 13.0824 7.36263 13.2225 7.22253C13.3626 7.08244 13.5519 7.00259 13.75 7ZM13.75 16.5C13.9481 16.5026 14.1374 16.5824 14.2775 16.7225C14.4176 16.8626 14.4974 17.0519 14.5 17.25L14.5 17.75C14.5 17.9489 14.421 18.1397 14.2803 18.2803C14.1397 18.421 13.9489 18.5 13.75 18.5C13.5511 18.5 13.3603 18.421 13.2197 18.2803C13.079 18.1397 13 17.9489 13 17.75L13 17.25C13.0026 17.0519 13.0824 16.8626 13.2225 16.7225C13.3626 16.5824 13.5519 16.5026 13.75 16.5Z" fill="#F8F8F8"/></svg>
          </span>
          <span v-else class="absolute top-2 right-2 z-20 p-1 rounded-full">
            <svg width="32" height="32" viewBox="0 0 24 26" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10.5" fill="black"/><path d="M11.9999 0.333496C18.4434 0.333496 23.6666 5.55666 23.6666 12.0002C23.6666 18.4437 18.4434 23.6668 11.9999 23.6668C5.55642 23.6668 0.333252 18.4437 0.333252 12.0002C0.333252 5.55666 5.55642 0.333496 11.9999 0.333496ZM11.9999 5.00016C11.6905 5.00016 11.3938 5.12308 11.175 5.34187C10.9562 5.56066 10.8333 5.85741 10.8333 6.16683V12.0002C10.8333 12.3096 10.9563 12.6063 11.1751 12.825L14.6751 16.325C14.8951 16.5375 15.1898 16.6551 15.4957 16.6525C15.8016 16.6498 16.0942 16.5271 16.3105 16.3108C16.5269 16.0945 16.6495 15.8019 16.6522 15.496C16.6549 15.1901 16.5373 14.8954 16.3248 14.6753L13.1666 11.5172V6.16683C13.1666 5.85741 13.0437 5.56066 12.8249 5.34187C12.6061 5.12308 12.3093 5.00016 11.9999 5.00016Z" fill="#F0BF6C"/></svg>
          </span>
          <div class="absolute bottom-2 right-2 bg-black/80 text-white text-sm px-3 py-1 rounded-lg z-20 backdrop-blur-sm">
            {{ hotel.agreedPrice }} /nuit €
            <div class="text-xs text-gray-300">Taxe et frais compris</div>
          </div>
        </div>
        <div class="p-4">
          <h3 class="font-semibold text-lg truncate" :title="hotel.name">{{ hotel.name }}</h3>
          <div class="flex items-center text-yellow-400 text-sm mb-2">
            <span v-for="i in Math.floor(hotel.rating || 0)" :key="`full-${i}`">★</span>
            <span v-if="hotel.rating % 1 !== 0">½</span>
            <span v-for="i in Math.floor(5 - (hotel.rating || 0))" :key="`empty-${i}`" class="text-gray-300">★</span>
            <span class="text-gray-500 text-xs ml-2">({{ hotel.rating || 'N/A' }})</span>
          </div>
          <div class="text-gray-500 text-sm flex items-center space-x-2">
            <span class="flex items-center"><svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" /></svg> {{ hotel.distance || 'N/A' }}</span>
            <span>{{ hotel.address || 'Adresse inconnue' }}</span>

          </div>
        </div>
      </div>
    </div>

    <div v-else class="px-4 py-6 space-y-4">
      <div class="relative">
        <img :src="selectedHotel.image || '/placeholder.jpg'" @error="onImageError" class="w-full h-52 object-cover rounded-xl" :alt="selectedHotel.name" />
        <div class="absolute bottom-2 right-2 bg-black/80 text-white text-sm px-3 py-1 rounded-lg backdrop-blur-sm">
          {{ selectedHotel.agreedPrice }} /nuit €
          <div class="text-xs text-gray-300">Taxe et frais compris</div>
        </div>
      </div>

      <h2 class="text-2xl font-semibold">{{ selectedHotel.name }}</h2>
      <div class="flex items-center text-yellow-400 text-sm mb-2">
         <span v-for="i in Math.floor(selectedHotel.rating || 0)" :key="`full-detail-${i}`">★</span>
         <span v-if="selectedHotel.rating % 1 !== 0">½</span>
         <span v-for="i in Math.floor(5 - (selectedHotel.rating || 0))" :key="`empty-detail-${i}`" class="text-gray-300">★</span>
         <span class="text-gray-500 text-xs ml-2">({{ selectedHotel.rating || 'N/A' }})</span>
      </div>
      <div class="text-gray-600 text-sm flex items-center space-x-2">
        <span class="flex items-center"><svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" /></svg> {{ selectedHotel.distance || 'N/A' }}</span>
        <span>{{ selectedHotel.address || 'Adresse inconnue' }}</span>
      </div>

      <div class="border-t pt-4 mt-4 space-y-3">
        <h3 class="font-semibold text-lg">Contre proposition</h3>
        <div class="flex justify-end">
          <div class="bg-orange-100 text-orange-800 p-3 rounded-lg max-w-[75%] text-sm">
            Prix négocié du client à {{ selectedHotel.originalPrice - 10 }} €
          </div>
        </div>
        <div class="flex justify-start items-start space-x-2">
          <img :src="selectedHotel.image || '/placeholder.jpg'" @error="onImageError" class="w-8 h-8 rounded-full object-cover flex-shrink-0" alt="Hotel avatar"/>
          <div class="bg-gray-100 text-gray-800 p-3 rounded-lg max-w-[75%] text-sm">
            L’hôtelier vous propose cette chambre pour {{ selectedHotel.agreedPrice }} €
          </div>
        </div>

        <div class="flex justify-around items-center py-5 shrink-0 gap-10">
          <button @pointerdown.stop @click="handleSwipe('left')"
            class="w-16 h-16 rounded-full bg-neutral-800 text-white flex items-center justify-center hover:bg-neutral-900 hover:scale-105 transition-all duration-200 ease-in-out"
            title="Refuser">
            <svg class="w-7 h-7" viewBox="0 0 32 32" fill="none"><path d="M28.9375 3.0625L3.0625 28.9375M3.0625 3.0625L28.9375 28.9375" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" /></svg>
          </button>
          <button @pointerdown.stop @click="handleSwipe('right')"
            :disabled="isProcessingPayment"
            class="w-16 h-16 rounded-full bg-[#D9AC73] text-white flex items-center justify-center hover:bg-[#c89f63] hover:scale-105 transition-all duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
            title="Accepter">
            <svg v-if="!isProcessingPayment" class="w-8 h-8" viewBox="0 0 35 26" fill="none"><path d="M4 13L13 22L31 4" stroke="currentColor" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" /></svg>
            <svg v-else class="animate-spin h-7 w-7 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </button>
        </div>

        <div class="text-center mt-4">
          <button class="text-sm underline text-gray-500 hover:text-gray-700" @click="selectedHotel = null">
            ← Retour à la liste
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { loadStripe } from "@stripe/stripe-js";

const filters = ['En cours', 'Acceptées', 'Refus'];
const activeFilter = ref(filters[0]); 
const allHotels = ref([]); 
const selectedHotel = ref(null); 
const isLoading = ref(true); 
const isProcessingPayment = ref(false);
const stripeLoadingError = ref(null);
let stripe = null; 

const filteredHotels = computed(() => {
  if (!activeFilter.value) return allHotels.value;
  return allHotels.value.filter(hotel => hotel.status === activeFilter.value);
});

function setActiveFilter(filterName) {
  activeFilter.value = filterName;
  selectedHotel.value = null; 
}

function selectHotel(hotel) {
  selectedHotel.value = hotel;
}

function onImageError(event) {
  event.target.src = '/placeholder.jpg'; 
}

async function fetchReservations() {
  isLoading.value = true;
  console.log("Fetching reservations...");
  await new Promise(resolve => setTimeout(resolve, 500)); 
  try {
    allHotels.value = [
      { id: 'hotel_1', name: 'Hotel de Paris', image: "/rooms/example.jpg", rating: 4, alert: false, originalPrice: 230, agreedPrice: 220, status: 'En cours', distance: '3,4km', address: 'Paris, 32 Rue de Rivoli' },
      { id: 'hotel_2', name: 'Hotel Magnifique', image: "/rooms/example2.jpg", rating: 5, alert: false, originalPrice: 250, agreedPrice: 240, status: 'Acceptées', distance: '1,2km', address: 'Paris, 64 Rue de Ranelagh' },
      { id: 'hotel_3', name: 'Petit Hotel', image: "/rooms/example.jpg", rating: 3, alert: false, originalPrice: 180, agreedPrice: 170, status: 'Refus', distance: '5,0km', address: 'Paris, 242 Faubourg Saint-Antoine' },
      { id: 'hotel_4', name: 'Grand Hotel Central', image: "/rooms/example2.jpg", rating: 4, alert: true, originalPrice: 210, agreedPrice: 210, status: 'En cours', distance: '0.5km', address: 'Paris, 6 Place Vandetta' },
      { id: 'hotel_5', name: 'Hotel Vue Mer', image: "/rooms/example.jpg", rating: 4, alert: false, originalPrice: 300, agreedPrice: 280, status: 'Acceptées', distance: '10km', address: 'Nice, Promenade des Anglais' }, 
    ];
    console.log("Reservations fetched:", allHotels.value);
  } catch (error) {
    console.error("Failed to fetch reservations:", error);
  } finally {
    isLoading.value = false;
  }
}

async function handleSwipe(direction) {
  if (!selectedHotel.value || isProcessingPayment.value) return;

  if (direction === "left") {
    console.log(`Rejecting offer for ${selectedHotel.value.name}`);
    const hotelInList = allHotels.value.find(h => h.id === selectedHotel.value.id);
    if (hotelInList) hotelInList.status = 'Refus';

    selectedHotel.value = null; 
  } else if (direction === "right") {
    console.log(`Accepting offer for ${selectedHotel.value.name}, proceeding to payment...`);

    if (stripeLoadingError.value) {
      alert(`Payment cannot proceed: ${stripeLoadingError.value}`);
      return;
    }
    if (!stripe) {
      alert("Stripe is not ready yet. Please wait a moment and try again.");
      return;
    }

    const hotelName = selectedHotel.value.name || 'Hotel Reservation';
    const agreedPrice = selectedHotel.value.agreedPrice;
    console.log(`Agreed price for ${hotelName}:`, agreedPrice);
    
    const hotelImage = selectedHotel.value.image ? [window.location.origin + selectedHotel.value.image] : [];

    if (!agreedPrice || agreedPrice <= 0) {
      alert("Invalid agreed price for the hotel.");
      return;
    }

    isProcessingPayment.value = true; 

    try {
      const priceId =  'price_1RHo5zPqIGsIWpx4lGdn1X1S'; 
      const quantity = Math.round(agreedPrice);

      if (!priceId || priceId === 'YOUR_PRICE_ID_HERE') {
          alert("Stripe Price ID chưa được cấu hình trong code!");
          isProcessingPayment.value = false;
          return;
      }
       if (isNaN(quantity) || quantity <= 0) {
          alert(`Giá hoặc số lượng không hợp lệ (quantity=${quantity}). Kiểm tra agreedPrice.`);
          isProcessingPayment.value = false;
          return;
      }

      console.log(`Redirecting to Stripe with Price ID: ${priceId}, Quantity: ${quantity}`);

      const { error } = await stripe.redirectToCheckout({
        lineItems: [{
          price: priceId,       
          quantity: quantity, 
        }],
        mode: 'payment',
        successUrl: `${window.location.origin}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${window.location.origin}/payment-cancel`,
      });

      if (error) {
        console.error("Stripe checkout error:", error);
        alert(`Payment failed: ${error.message}`);
        isProcessingPayment.value = false;
      }

    } catch (err) {
      console.error("Error during redirect to checkout:", err);
      alert("An unexpected error occurred while trying to proceed to payment.");
      isProcessingPayment.value = false;
    }
  }
}

onMounted(async () => {
  await fetchReservations();

  try {
    stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
    if (!stripe) {
      stripeLoadingError.value = "Stripe.js failed to load.";
      console.error(stripeLoadingError.value);
    } else {
       console.log("Stripe loaded successfully.");
    }
  } catch (error) {
    stripeLoadingError.value = `Error loading Stripe: ${error.message}`;
    console.error(stripeLoadingError.value, error);
  }
});

</script>

<style scoped>
button {
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out, transform 0.2s ease-in-out;
}

img[src$="/placeholder.jpg"] {
  background-color: #f0f0f0;
}

.animate-spin {
  animation: spin 1s linear infinite;
}
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>
