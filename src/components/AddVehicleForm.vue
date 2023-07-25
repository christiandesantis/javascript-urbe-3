<template>
  <q-form
    @submit.prevent="onSubmit"
    class="q-gutter-md q-ml-auto q-mr-auto"
    :class="{'q-pa-md': $q.screen.lt.md, 'q-mt-md': $q.screen.gt.sm}"
    >

    <q-select
      filled
      v-model="selectedOwner"
      :options="ownerOptions"
      label="Propietario *"
      hint="Seleccionar propietario del vehículo"
      />

    <q-input
      filled
      v-model="vehicleData.plate"
      label="Placa *"
      hint="Placa del vehículo"
      lazy-rules
      :rules="[ val => (!!val || formSubmitted) || 'Debe ingresar un valor']"
    />

    <q-select
      filled
      v-model="vehicleData.brand"
      :options="brandOptions"
      label="Marca *"
      hint="Seleccionar marca del vehículo"
      />

    <q-input
      filled
      v-model="vehicleData.model"
      label="Modelo *"
      hint="Modelo del vehículo"
      lazy-rules
      :rules="[ val => (!!val || formSubmitted) || 'Debe ingresar un valor']"
    />

    <q-input
      filled
      type="number"
      v-model="vehicleData.year"
      label="Año *"
      hint="Año del vehículo"
      lazy-rules
      :rules="[ val => ((!!val && val > 0) || formSubmitted) || 'Debe ingresar un valor']"
    />

    <q-input
      filled
      v-model="vehicleData.color"
      label="Color"
      hint="Color del vehículo"
      lazy-rules
    />

    <div class="q-mt-lg q-mb-md q-ml-none">
      <q-btn label="Guardar" type="submit" color="primary" class="q-ml-auto q-mr-auto block"/>
    </div>
  </q-form>
</template>

<script lang="ts" setup>
import { computed, reactive, ref, watch } from 'vue'
import { useMainStore } from '../stores/main-store'

const store = useMainStore()

const formSubmitted = ref(false)

const brandOptions = [
  'Chevrolet',
  'Ford',
  'Fiat',
  'Renault',
  'Peugeot',
  'Volkswagen',
  'Toyota',
  'Honda',
  'Nissan',
  'Hyundai',
  'Kia',
  'Suzuki',
  'Mazda',
  'Mitsubishi',
  'Mercedes-Benz',
  'BMW',
  'Audi',
  'Volvo',
  'Land Rover',
  'Jeep',
  'Porsche',
  'Jaguar'
]

const ownerOptions = computed(() => {
  return store.owners.map((owner) => {
    return {
      label: `${owner.name} ${owner.last_name}`,
      value: owner.id
    }
  })
})

const selectedOwner = ref(null as unknown as {label: string, value: string})
watch(selectedOwner, (value) => {
  if (value) vehicleData.owner_id = value.value
})

const vehicleData = reactive({
  owner_id: null as unknown as string,
  plate: null as unknown as string,
  brand: null as unknown as string,
  model: null as unknown as string,
  year: null as unknown as number,
  color: null as unknown as string
})

async function onSubmit () {
  await store.createVehicle(vehicleData)
    .then(() => {
      formSubmitted.value = true
      vehicleData.brand = null as unknown as string
      vehicleData.plate = null as unknown as string
      vehicleData.model = null as unknown as string
      vehicleData.year = null as unknown as number
      vehicleData.color = null as unknown as string
      selectedOwner.value = null as unknown as {label: string, value: string}
      vehicleData.owner_id = null as unknown as string
      setTimeout(() => {
        formSubmitted.value = false
      }, 1000)
    })
    .catch((error) => {
      console.log(error)
    })
}

</script>
