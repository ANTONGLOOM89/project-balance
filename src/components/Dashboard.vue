<script lang="ts" setup>
import { ref } from 'vue'
import useSystemStore from '@/store/system.ts'

const systemStore = useSystemStore()

type TProps = {
  price: string,
  balance: string
}

const { price, balance } = defineProps<TProps>()





const recipientAddress = ref<string>('')
const amount = ref<string>('')



const sendAmount = () => {
  systemStore.transferAmount(recipientAddress.value, amount.value)
}

</script>

<template lang="pug">
v-card(color)
  .d-flex.justify-space-between.align-center
    v-card-title 
      h3 Данные системы
  .ma-4
      .d-flex.justify-space-between.align-center
        .d-flex.align-center
          h3.mr-3 Стоимость газа
          v-btn(
            icon
            size="30"
            color="primary"
            @click="systemStore.getGasPrice"
          ).mr-4
            v-icon(size="16") mdi-reload
        v-skeleton-loader(
          v-if="!price"
          loading="true"
          height="15"
          width="200"
        )
        div(v-else) {{ price }} WEI 
      .d-flex.justify-space-between.align-center.mt-4
        .d-flex.align-center
          h3.mr-3 Баланс аккаунта
          v-btn(
            icon
            size="30"
            color="primary"
            @click="systemStore.getGasBalance"
          ).mr-4
            v-icon(size="16") mdi-reload
        v-skeleton-loader(
          v-if="!balance"
          loading="true"
          height="15"
          width="200"
        )
        div(v-else) {{ balance }} ETH
      h3.mt-4 Перевод средств
      v-row.mt-3
        v-col(cols=7)
          v-text-field(
            density="compact"
            variant="outlined"
            label="Введите адрес получателя"
            v-model="recipientAddress"
            clearable
            clear-icon="mdi-close"
            @click:clear="clearInput"
          )
        v-col(cols=3)
          v-text-field(
            density="compact"
            variant="outlined"
            label="Введите сумму в ETH"
            v-model="amount"
            clearable
            clear-icon="mdi-close"
            @click:clear="clearInput"
          )
        v-col(cols=2)
          v-btn(
            @click="sendAmount"
            color="primary"
            height="39"
            :disabled="!recipientAddress || !amount"
          ) Отправить
        
        
          
  

</template>

<style lang="less" scoped>

</style>