<template>
  <q-page>
    <q-card>
      <q-card-section>
        <q-item-label header>Owners</q-item-label>
      </q-card-section>

      <q-card-section>
        <q-table
          :data="owners"
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
              label="Add Owner"
              @click="addOwner"
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
const owners = ref([])
const pagination = ref({
  sortBy: 'id',
  descending: false,
  page: 1,
  rowsPerPage: 10
})

const columns = [
  { name: 'id', align: 'left', required: true, label: 'ID', field: 'id', sortable: true },
  { name: 'name', align: 'left', required: true, label: 'Name', field: 'name', sortable: true },
  { name: 'email', align: 'left', required: true, label: 'Email', field: 'email', sortable: true },
  { name: 'phone', align: 'left', required: true, label: 'Phone', field: 'phone', sortable: true },
  { name: 'actions', align: 'left', required: true, label: 'Actions', field: 'actions' }
]

// const columns = [
//   {
//     name: 'name',
//     required: true,
//     label: 'Dessert (100g serving)',
//     align: 'left',
//     field: row => row.name,
//     format: val => `${val}`,
//     sortable: true
//   }
// ]

async function loadOwners () {
  loading.value = true
  // owners.value = await getOwners()
  loading.value = false
}

async function getOwners () {
  // TODO: Implement get owner functionality
}

function addOwner () {
  // TODO: Implement add owner functionality
}

onMounted(() => {
  loadOwners()
})

</script>
