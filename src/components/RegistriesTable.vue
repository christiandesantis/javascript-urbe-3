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

// const columns = [
//   {
//     name: 'name',
//     required: true,
//     label: 'Dessert (100g serving)',
//     align: 'left',
//     field: row => row.name,
//     format: val => `${val}`,
//     sortable: true
//   },
//   { name: 'calories', align: 'center', label: 'Calories', field: 'calories', sortable: true },
//   { name: 'fat', label: 'Fat (g)', field: 'fat', sortable: true },
//   { name: 'carbs', label: 'Carbs (g)', field: 'carbs' },
//   { name: 'protein', label: 'Protein (g)', field: 'protein' },
//   { name: 'sodium', label: 'Sodium (mg)', field: 'sodium' },
//   { name: 'calcium', label: 'Calcium (%)', field: 'calcium', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
//   { name: 'iron', label: 'Iron (%)', field: 'iron', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
// ]
const columns = [
  {
    name: 'vehicle',
    field: 'vehicle',
    label: 'Vehículo',
    align: 'left',
    sortable: true
  },
  {
    name: 'owner',
    field: 'owner',
    label: 'Propietario',
    align: 'left',
    sortable: true
  },
  {
    name: 'date',
    field: 'date',
    label: 'Fecha',
    align: 'left',
    sortable: true
  },
  {
    name: 'time',
    field: 'time',
    label: 'Hora',
    align: 'left',
    sortable: true
  },
  {
    name: 'type',
    field: 'type',
    label: 'Tipo de mantenimiento',
    align: 'left',
    sortable: true
  },
  {
    name: 'cost',
    field: 'cost',
    label: 'Costo',
    align: 'left',
    sortable: true
  },
  {
    name: 'description',
    field: 'description',
    label: 'Descripción',
    align: 'left',
    sortable: true
  }
]

const rows = computed(() => {
  return store.registries.map(registry => {
    return {
      vehicle: store.vehicles.find(vehicle => vehicle.id === registry.vehicle_id).plate,
      owner: `${store.owners.find(el => el.id === store.vehicles.find(vehicle => vehicle.id === registry.vehicle_id).owner_id).name} ${store.owners.find(el => el.id === store.vehicles.find(vehicle => vehicle.id === registry.vehicle_id).owner_id).last_name}`,
      date: registry.date,
      time: registry.time,
      type: registry.corrective ? 'Correctivo' : 'Preventivo',
      cost: registry.cost,
      description: registry.description
    }
  })
})
</script>
