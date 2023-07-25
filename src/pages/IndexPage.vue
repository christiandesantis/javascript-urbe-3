<template>
  <q-page class="q-pa-md">
    <div class="row justify-around">
      <q-card class="col-md-8">
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
          >
          <q-tab name="add" icon="add" label="Agregar" />
          <q-tab name="registries" icon="history" label="Registros" />
          <q-tab name="owners" icon="group" label="Propietarios" />
          <q-tab name="vehicles" icon="no_crash" label="Vehículos" />
        </q-tabs>

        <q-separator />

        <q-tab-panels keep-alive v-model="tab" animated>
          <q-tab-panel name="add">
            <!-- <div class="text-h6 q-mb-lg">Agregar</div> -->
            <AddForm />
          </q-tab-panel>

          <q-tab-panel name="registries">
            <div class="text-h6 q-mb-lg">Registros</div>
            <RegistriesTable />
          </q-tab-panel>

          <q-tab-panel name="owners">
            <div class="text-h6 q-mb-lg">Propietarios</div>
            <OwnersTable />
          </q-tab-panel>

          <q-tab-panel name="vehicles">
            <div class="text-h6 q-mb-lg">Vehículos</div>
            <VehiclesTable />
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>

  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AddForm from '../components/AddForm.vue'
import RegistriesTable from 'src/components/RegistriesTable.vue'
import OwnersTable from 'src/components/OwnersTable.vue'
import VehiclesTable from 'src/components/VehiclesTable.vue'

const tab = ref('add')

</script>
