<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useMainStore } from './stores/main-store'

const store = useMainStore()

onMounted(async () => {
  if (store.owners.length === 0) {
    await store.fetchOwners()
  }
  if (store.vehicles.length === 0) {
    await store.fetchVehicles()
  }
  if (store.registries.length === 0) {
    await store.fetchRegistries()
  }
})
</script>
