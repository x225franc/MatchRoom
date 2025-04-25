<template>
  <div class="relative text-white font-serif">
    <div
      class="relative bg-cover bg-center bg-no-repeat min-h-[80vh] flex items-center justify-center px-4"
      style="background-image: url('/rome.webp')"
    >
      <div
        class="bg-black bg-opacity-60 w-full h-full absolute top-0 left-0 z-0"
      ></div>
      <div class="z-10 text-center">
        <p class="text-[#E8CEB7] text-sm tracking-widest mb-2">
          UNIQUE PALACE & LUXURY HOTEL
        </p>
        <h1 class="text-4xl md:text-6xl font-bold leading-tight mb-4">
          LIFE ENJOY WITH THE <br />
          GRANT MOMENTS
        </h1>
        <button
          class="bg-gradient-to-b from-[#BAA089] to-[#E8CEB7] text-black px-6 py-2 rounded-full font-semibold hover:bg-yellow-400 transition"
        >
          EXPLORE MORE →
        </button>
      </div>
    </div>

    <div class="relative z-20 -mt-12">
      <BookingBar />
    </div>
    <div class="bg-white text-black px-6 py-16 -mt-10">
      <div class="max-w-5xl mx-auto text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold font-serif mt-10">
          Luxury Deals, Without the Full Price
        </h2>
        <p class="text-gray-700 max-w-2xl mx-auto">
          We unlock last-minute availability at prestigious hotels and transform
          them into exclusive opportunities — for you. Experience premium stays
          at a fraction of the price.
        </p>
      </div>

      <div
        class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto text-center"
      >
        <div
          class="p-6 rounded-xl border border-gray-200 shadow hover:shadow-lg transition mb-10"
        >
          <p class="text-3xl mb-3">📅</p>
          <h3 class="text-xl font-semibold mb-2">Last-Minute Luxury</h3>
          <p class="text-gray-600">
            Take advantage of last-minute hotel openings due to cancellations or
            unbooked suites.
          </p>
        </div>

        <div
          class="p-6 rounded-xl border border-gray-200 shadow hover:shadow-lg transition mb-10"
        >
          <p class="text-3xl mb-3">🏷️</p>
          <h3 class="text-xl font-semibold mb-2">Exclusive Rates</h3>
          <p class="text-gray-600">
            Get access to luxury hotel rooms for up to 60% less than the
            standard rate — no compromises.
          </p>
        </div>

        <div
          class="p-6 rounded-xl border border-gray-200 shadow hover:shadow-lg transition mb-10"
        >
          <p class="text-3xl mb-3">⭐</p>
          <h3 class="text-xl font-semibold mb-2">Curated Selection</h3>
          <p class="text-gray-600">
            We work only with 3 & more ★ hotels — handpicked for elegance,
            service, and unforgettable experiences.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BookingBar from "@/components/BookingBar.vue";

export default {
  components: {
    BookingBar,
  },
};
</script>
