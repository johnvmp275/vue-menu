<script setup>
import { RouterView } from 'vue-router'
import Navbar from './components/widgets/Navbar.vue'
</script>

<template>
  <Navbar />
  <main>
    <RouterView />
  </main>
</template>

