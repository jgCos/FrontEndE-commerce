<script setup>
import Navbar from './components/NavbarComponent.vue'
</script>

<template>
  <div class="min-h-screen bg-gray-800 flex flex-col">
    <Navbar />
    <main class="container mx-auto px-4 pt-12 pb-6 flex-grow">
      <router-view />
    </main>
  </div>
</template>
