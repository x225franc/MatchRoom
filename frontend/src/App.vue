<script setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import { useRoute } from 'vue-router'
import { ref, onMounted, watchEffect } from 'vue'

const route = useRoute()
const isDark = ref(false)

const applyTheme = (value) => {
  document.documentElement.classList.toggle('dark', value)
  localStorage.setItem('theme', value ? 'dark' : 'light')
}

const toggleDarkMode = () => {
  isDark.value = !isDark.value
  applyTheme(isDark.value)
}

onMounted(() => {
  const saved = localStorage.getItem('theme')
  if (saved === 'dark') {
    isDark.value = true
  } else if (saved === 'light') {
    isDark.value = false
  } else {
    isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
  }
  applyTheme(isDark.value)
})

watchEffect(() => {
  applyTheme(isDark.value)
})
</script>

<template>
  <div>
    <Header v-if="route.meta.showHeaderFooter" :isDark="isDark" :toggleDarkMode="toggleDarkMode" />
    <router-view />
    <Footer v-if="route.meta.showHeaderFooter" />
  </div>
</template>
