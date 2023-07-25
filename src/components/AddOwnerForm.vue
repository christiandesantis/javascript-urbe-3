<template>
  <q-form
    @submit.prevent="onSubmit"
    class="q-gutter-md q-ml-auto q-mr-auto"
    :class="{'q-pa-md': $q.screen.lt.md, 'q-mt-md': $q.screen.gt.sm}"
    >

    <q-input
      filled
      v-model="ownerData.name"
      label="Nombre *"
      hint="Nombre del propietario"
      lazy-rules
      :rules="[ val => (!!val || formSubmitted) || 'Debe ingresar un valor']"
    />

    <q-input
      filled
      v-model="ownerData.last_name"
      label="Apellido *"
      hint="Apellido del propietario"
      lazy-rules
      :rules="[ val => (!!val || formSubmitted) || 'Debe ingresar un valor']"
    />

    <q-input
      filled
      type="email"
      v-model="ownerData.email"
      label="Correo electrónico *"
      hint="Correo electrónico del propietario"
      lazy-rules
      :rules="[ val => (!!val && (/\S+@\S+\.\S+/.test(val))) || formSubmitted || 'Debe ingresar un correo electrónico válido']"
    />

    <q-input
      filled
      type="number"
      v-model="ownerData.phone"
      label="Número telefónico *"
      hint="Número telefónico del propietario"
      lazy-rules
      :rules="[ val => ((!!val && val > 0) || formSubmitted) || 'Debe ingresar un valor']"
    />

    <q-input
      filled
      v-model="ownerData.address"
      label="Dirección"
      hint="Dirección del propietario"
      lazy-rules
    />

    <div class="q-mt-lg q-mb-md q-ml-none">
      <q-btn label="Guardar" type="submit" color="primary" class="q-ml-auto q-mr-auto block"/>
    </div>
  </q-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useMainStore } from '../stores/main-store'

const store = useMainStore()

const formSubmitted = ref(false)

const ownerData = reactive({
  name: null as unknown as string,
  last_name: null as unknown as string,
  email: null as unknown as string,
  address: null as unknown as string,
  phone: null as unknown as number
})

async function onSubmit () {
  await store.createOwner(ownerData)
    .then(() => {
      formSubmitted.value = true
      ownerData.name = null as unknown as string
      ownerData.last_name = null as unknown as string
      ownerData.email = null as unknown as string
      ownerData.address = null as unknown as string
      ownerData.phone = null as unknown as number
      setTimeout(() => {
        formSubmitted.value = false
      }, 1000)
    })
    .catch((error) => {
      console.log(error)
    })
}
</script>
