<script lang="ts" setup>
import { onMounted } from 'vue'
import Dashboard from "@/components/Dashboard.vue"
import useSystemStore from '@/store/system.ts'
import Dialog from '@/components/Dialog.vue'

const systemStore = useSystemStore()


onMounted(() => {
  systemStore.getGasPrice()
  systemStore.getGasBalance()
})
</script>

<template lang="pug">
v-container(fill-height fluid width="900")
  v-row(align="center" justify="center" )
    v-col(cols="12")
      Dashboard(
        :price="systemStore.getPrice"
        :balance="systemStore.getBalance"
      )
  Dialog
</template>

<style scoped>
h1 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}
p {
  font-size: 1.2rem;
}
</style>

