<template>
	<header class="flex justify-end p-4">
	  <DarkModeToggle :isDark="isDark" :toggleDarkMode="toggleDarkMode" />
	</header>
  </template>
  
  <script setup>
  import DarkModeToggle from '@/components/DarkModeToggle.vue'
  defineProps(['isDark', 'toggleDarkMode'])
  </script>
  