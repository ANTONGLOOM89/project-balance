<script lang="ts" setup>
import { ref, computed } from 'vue'
import useSystemStore from '@/store/system.ts'

const systemStore = useSystemStore()


const data = computed(() => systemStore.getDialog)
const dialog = computed(() => data.value?.form)
const closeDialog = () => { systemStore.closeDialog() }



// const dialog = computed(() => true)

</script>

<template lang="pug">
.text-center.pa-4
  v-dialog(v-model='dialog' width='auto')
    v-card(max-width='900')
      template(v-slot:title)
        .d-flex
          v-icon(left :color="data.color") {{ data.icon }}
          h4.ml-2 {{ data.info }}
      template(v-slot:text)
        v-row
          v-col(col=4) 
            h4 Адрес отправки:
          v-col(col=8)  {{ data.account }}
        v-row
          v-col(col=4) 
            h4 Адрес получателя:
          v-col(col=8)  {{ data.recipientAddress }}
        v-row
          v-col(col=4) 
            h4 Сумма отправленных средств:
          v-col(col=8)  {{ data.amount }}
        div(style="color: red" v-if="data.textError")
          h3.mt-4 Описание ошибки:
          div {{ data.textError }}
      template(v-slot:actions='')
        v-btn(
          text='Закрыть'
          color="primary"
          @click='closeDialog'
        )
</template>