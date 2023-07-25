<template>
  <div class="q-pa-md">
    <q-table
      :rows="rows"
      :columns="columns"
      row-key="vehicle"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useMainStore } from '../stores/main-store'

const store = useMainStore()

const columns = [
  {
    name: 'owner',
    field: 'owner',
    label: 'Propietario',
    align: 'left',
    sortable: true
  },
  {
    name: 'plate',
    field: 'plate',
    label: 'Placa',
    align: 'left',
    sortable: true
  },
  {
    name: 'brand',
    field: 'brand',
    label: 'Marca',
    align: 'left',
    sortable: true
  },
  {
    name: 'model',
    field: 'model',
    label: 'Modelo',
    align: 'left',
    sortable: true
  },
  {
    name: 'year',
    field: 'year',
    label: 'Año',
    align: 'left',
    sortable: true
  },
  {
    name: 'color',
    field: 'color',
    label: 'Color',
    align: 'left',
    sortable: true
  }
]

const rows = computed(() => {
  return store.vehicles.map(vehicle => {
    return {
      owner: `${store.owners.find(el => el.id === vehicle.owner_id).name} ${store.owners.find(el => el.id === vehicle.owner_id).last_name}`,
      plate: vehicle.plate,
      brand: vehicle.brand,
      model: vehicle.model,
      year: vehicle.year,
      color: vehicle.color
    }
  })
})
</script>
