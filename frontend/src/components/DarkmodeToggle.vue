<template>
    <button
      @click="toggleDarkMode"
      class="flex items-center gap-2 px-3 py-1 rounded text-sm font-medium transition
             bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600"
    >
      <span v-if="isDark">🌙 Dark Mode</span>
      <span v-else>☀️ Light Mode</span>
    </button>
  </template>
  
  <script setup>
  defineProps({
    isDark: Boolean,
    toggleDarkMode: Function
  })
  </script>
  