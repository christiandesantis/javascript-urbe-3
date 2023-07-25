<template>
  <div class="q-pa-md">
    <q-table
      :rows="rows"
      :columns="columns"
      row-key="email"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useMainStore } from '../stores/main-store'

const store = useMainStore()

const columns = [
  {
    name: 'name',
    field: 'name',
    label: 'Nombre',
    align: 'left',
    sortable: true
  },
  {
    name: 'lastname',
    field: 'lastname',
    label: 'Apellido',
    align: 'left',
    sortable: true
  },
  {
    name: 'email',
    field: 'email',
    label: 'Correo Electrónico',
    align: 'left',
    sortable: true
  },
  {
    name: 'phone',
    field: 'phone',
    label: 'Teléfono',
    align: 'left',
    sortable: true
  },
  {
    name: 'address',
    field: 'address',
    label: 'Dirección',
    align: 'left',
    sortable: true
  },
  {
    name: 'vehicles',
    field: 'vehicles',
    label: 'Nº de Vehículos',
    align: 'left',
    sortable: true
  }
]

const rows = computed(() => {
  return store.owners.map(owner => {
    return {
      name: owner.name,
      lastname: owner.last_name,
      email: owner.email,
      phone: owner.phone,
      address: owner.address,
      vehicles: store.vehicles.filter(vehicle => vehicle.owner_id === owner.id).length
    }
  })
})
</script>
