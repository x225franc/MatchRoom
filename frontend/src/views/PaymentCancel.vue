<template>
    <div class="min-h-screen flex flex-col items-center justify-center bg-red-50 text-center p-6">
        <svg class="w-24 h-24 text-red-500 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <h1 class="text-3xl font-bold text-red-800 mb-4">Payment Cancelled</h1>
        <p class="text-lg text-gray-700 mb-8">
            Your payment process was cancelled. You have not been charged.
        </p>
        <router-link to="/reservations"
            class="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition">
            Return to Reservations
        </router-link>
        <router-link to="/" class="mt-4 text-gray-600 hover:underline">
            Go to Homepage
        </router-link>
    </div>
</template>

<script setup>
</script>