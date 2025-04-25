<template>
    <div class="min-h-screen flex flex-col items-center justify-center bg-green-50 text-center p-6">
        <svg class="w-24 h-24 text-green-500 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <h1 class="text-3xl font-bold text-green-800 mb-4">Payment Successful!</h1>
        <p class="text-lg text-gray-700 mb-8">
            Thank you for your reservation. Your payment has been processed successfully.
        </p>
        <p class="text-sm text-gray-500 mb-4">
            Checkout Session ID: {{ sessionId }}
        </p>
        <router-link to="/reservations2"
            class="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition">
            View My Reservations
        </router-link>
        <router-link to="/" class="mt-4 text-gray-600 hover:underline">
            Go to Homepage
        </router-link>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const sessionId = ref('');

onMounted(() => {
    // Lấy session_id từ query params để hiển thị (tùy chọn)
    sessionId.value = route.query.session_id || 'N/A';
    // Tại đây, bạn có thể gọi API backend để xác nhận trạng thái thanh toán bằng session_id nếu cần
    // Ví dụ: axios.post('/api/payment/verify', { sessionId: sessionId.value });
});
</script>