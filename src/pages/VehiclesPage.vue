<template>
  <q-page>
    <q-card>
      <q-card-section>
        <q-item-label header>Vehicles</q-item-label>
      </q-card-section>

      <q-card-section>
        <q-table
          :data="vehicles"
          :columns="columns"
          row-key="id"
          :loading="loading"
          :pagination="pagination"
          :rows-per-page-options="[10, 25, 50]"
        >
          <template v-slot:top-right>
            <q-btn
              color="primary"
              icon="add"
              label="Add Vehicle"
              @click="addVehicle"
            />
          </template>
        </q-table>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const loading = ref(false)
const vehicles = ref([])
const pagination = ref({
  sortBy: 'id',
  descending: false,
  page: 1,
  rowsPerPage: 10
})

const columns = [
  { name: 'id', align: 'left', label: 'ID', field: 'id', sortable: true },
  { name: 'make', align: 'left', label: 'Make', field: 'make', sortable: true },
  { name: 'model', align: 'left', label: 'Model', field: 'model', sortable: true },
  { name: 'year', align: 'left', label: 'Year', field: 'year', sortable: true },
  { name: 'actions', align: 'left', label: 'Actions', field: 'actions' }
]

async function loadVehicles () {
  loading.value = true
  // vehicles.value = await getVehicles()
  loading.value = false
}

async function getVehicles () {
  // TODO: Implement get vehicle functionality
}

function addVehicle () {
  // TODO: Implement add vehicle functionality
}

onMounted(() => {
  loadVehicles()
})
</script>
