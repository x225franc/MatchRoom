<template>
  <div
    @click="toggleDarkMode"
    class="w-16 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300"
    :class="isDark ? 'bg-black' : 'bg-gray-300'"
  >
    <div
      class="w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center text-white"
      :class="isDark ? 'translate-x-8 bg-white text-black' : 'translate-x-0 bg-white text-yellow-500'"
    >
      <span v-if="isDark">🌙</span>
      <span v-else>☀️</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  isDark: Boolean,
  toggleDarkMode: Function
})
</script>
