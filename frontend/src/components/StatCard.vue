<template>
  <div class="flex flex-col items-start justify-between bg-gray-50 dark:bg-gray-800 rounded-md p-4 h-full shadow-sm hover:shadow-md transition-colors">
    <div class="text-2xl mb-2">{{ icon }}</div>
    <div>
      <p class="text-sm text-gray-500 dark:text-gray-400">{{ title }}</p>
      <p class="text-xl font-bold text-gray-800 dark:text-white">{{ value }}</p>
    </div>
  </div>
</template>

  <script setup>
  defineProps({
    title: String,
    value: String,
    icon: String
  })
  </script>
  