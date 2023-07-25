<template>
  <div class="row justify-around">
    <div class="col-md-10 q-py-md q-px-md q-mb-xl">
      <div class="text-h6 q-mb-lg">Agregar Registro</div>
      <AddRegistryForm/>
    </div>

    <div class="col-md-5 q-py-md q-px-md" style="border: 1px solid rgb(25, 118, 210); border-radius: 10px;">
      <div class="text-h6 q-mb-lg">Agregar Propietario</div>
      <AddOwnerForm/>
    </div>
    <div class="col-md-5 q-py-md q-px-md" style="border: 1px solid rgb(25, 118, 210); border-radius: 10px;">
      <div class="text-h6 q-mb-lg">Agregar Vehículo</div>
      <AddVehicleForm/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import AddOwnerForm from './AddOwnerForm.vue'
import AddVehicleForm from './AddVehicleForm.vue'
import AddRegistryForm from './AddRegistryForm.vue'

</script>
