<template>
  <q-form
    @submit.prevent="onSubmit"
    class="q-gutter-md q-ml-auto q-mr-auto row justify-around"
    :class="{'q-pa-md': $q.screen.lt.md, 'q-mt-md': $q.screen.gt.sm}"
    >
    <div class="col-12">
      <q-select
        @filter="filterFn"
        use-input
        input-debounce="0"
        filled
        v-model="selectedVehicle"
        :options="filteredVehiclesOptions"
        label="Vehículo *"
        hint="Seleccionar vehículo"
        :rules="[
          (val: any) => requiredFieldRule(val),
        ]"
        />
    </div>

    <div class="col-md-5">
      <q-date
        v-model="registryData.date"
      />
    </div>

    <div class="col-md-5">
      <q-time v-model="registryData.time" />
    </div>

    <div class="col-12">
      <q-radio v-model="registryType" val="corrective" label="Correctivo" :rules="[ (val: any) => (!!val || formSubmitted) || 'Debe ingresar un valor']" />
      <q-radio v-model="registryType" val="preventive" label="Preventivo" :rules="[ (val: any) => (!!val || formSubmitted) || 'Debe ingresar un valor']" />
    </div>

    <div class="col-12">
      <q-input
        filled
        type="number"
        v-model="registryData.cost"
        label="Costo *"
        hint="Costo"
        lazy-rules
        :rules="[ val => (!!val || formSubmitted) || 'Debe ingresar un valor']"
      />
    </div>

    <div class="col-12">
      <q-input
        filled
        v-model="registryData.description"
        label="Descripción"
        hint="Descripción del registro"
        lazy-rules
        :rules="[ val => (!!val || formSubmitted) || 'Debe ingresar un valor']"
      />
    </div>

    <div class="q-mt-lg q-mb-md q-ml-none">
      <q-btn label="Guardar" type="submit" color="primary" class="q-ml-auto q-mr-auto block"/>
    </div>
  </q-form>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useMainStore } from '../stores/main-store'

const store = useMainStore()

const formSubmitted = ref(false)

// const registryDate = ref<Date>(null as unknown as Date)
// const registryTime = ref<string>(null as unknown as string)
const registryType = ref<string>(null as unknown as string)
watch(registryType, () => {
  if (registryType.value) {
    registryData.preventive = registryType.value === 'preventive'
    registryData.corrective = registryType.value === 'corrective'
  }
})
const selectedVehicle = ref(null as unknown as {label: string, value: string})
watch(selectedVehicle, (value) => {
  if (value) registryData.vehicle_id = value.value
})
const registryData = reactive({
  vehicle_id: null as unknown as string,
  date: null as unknown as string,
  time: null as unknown as string,
  preventive: null as unknown as boolean,
  corrective: null as unknown as boolean,
  cost: null as unknown as number,
  description: null as unknown as string
})

const filteredVehiclesOptions = ref<{label: string; value: string;}[]>()
const vehicleOptions = computed(() => {
  return store.vehicles.map((vehicle) => {
    return {
      label: `${vehicle.brand} ${vehicle.model} ${vehicle.year} (${vehicle.plate})`,
      value: vehicle.id
    }
  })
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function filterFn (val: string, update: any) {
  if (val === '') {
    update(() => {
      filteredVehiclesOptions.value = vehicleOptions.value

      // here you have access to "ref" which
      // is the Vue reference of the QSelect
    })
    return
  }

  update(() => {
    const needle = val.toLowerCase()
    filteredVehiclesOptions.value = vehicleOptions.value.filter((v: {label: string; value: string;}) => v.label.toLowerCase().indexOf(needle) > -1)
  })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const requiredFieldRule = (val: any) => ((val?.label && val?.label.length > 0) || formSubmitted.value) || 'Debe seleccionar un valor'

async function onSubmit () {
  await store.createRegistry(registryData)
    .then(() => {
      formSubmitted.value = true
      selectedVehicle.value = null as unknown as {label: string, value: string}
      registryData.vehicle_id = null as unknown as string
      registryData.date = null as unknown as string
      registryData.time = null as unknown as string
      registryData.preventive = null as unknown as boolean
      registryData.corrective = null as unknown as boolean
      registryData.cost = null as unknown as number
      registryData.description = null as unknown as string
      setTimeout(() => {
        formSubmitted.value = false
      }, 1000)
    })
    .catch((error) => {
      console.log(error)
    })
}

onMounted(() => {
  // registryDate.value = new Date().toISOString().slice(0, 10).replace(/-/g, '/')
  registryType.value = 'corrective'
})
</script>
