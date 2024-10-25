import { defineStore } from "pinia"
import config from '@/config/index.ts'
import { client, wallet } from '@/services/api.ts'
const { account, contract } = config

import { parseEther } from 'viem';


import {  parseAbi } from 'viem'
import { stat } from "fs";

const contractAbi = parseAbi([
  'function balanceOf() external view returns(uint256)',
  'function transferEther(address _to, uint256 amount) payable'
])


const amountInETH = (amaount: string) => {
  return (Number(amaount) / Math.pow(10, 18)).toFixed(4)
}

type TDialog = {
  account: string,
  recipientAddress: string,
  amount: string,
  form: boolean,
  icon: string,
  info: string,
  color: string,
  textError: string
}

type TState = {
  price: string | null,
  balance: string | null,
  dialog: TDialog
}

type TAccount = {
  address: any
}

const useSystemStore = defineStore({
  id: 'system',
  state: (): TState => ({
    price: null,
    balance: null,
    dialog: {
      account: '',
      recipientAddress: '',
      amount: '',
      form: false,
      icon: 'mdi-check-circle-outline',
      info: 'Транзакция прошла успешно',
      color: 'green',
      textError: ''
    }
  }),
  getters: {
    getPrice: (state) => state.price,
    getBalance: (state) => state.balance,
    getDialog: (state) => state.dialog
  },
  actions: {

    async getGasPrice() {
      try {
        this.price = ''
        const price = await client.getGasPrice()
        this.price = price.toString()
      } catch (error) {
        console.error('Ошибка при получении цены газа:', error)
      }
    },

    async getGasBalance() {
      try {
        const ownerAddress = account
        const balance = await client.readContract({
          address: contract,
          abi: contractAbi,
          functionName: 'balanceOf',
          account: ownerAddress
        })

        this.balance = amountInETH(balance)

      } catch (error) {
        console.error('Ошибка при получении баланса аккаунта:', error)
      }
    },

    async transferAmount(recipientAddress: string, amount: string) {
      try {
    

        const res = await wallet.writeContract({
          address: contract, 
          abi: contractAbi, // ABI контракта
          functionName: 'transferEther', // Имя функции в контракте
          args: [recipientAddress, parseEther(amount)], // Аргументы функции
          value: parseEther(amount), // Количество эфира, которое отправляем
          gasLimit: 30000, // Лимит газа, указываем вручную (по умолчанию можно указать примерно 21000)
        })


        this.dialog = { account, recipientAddress, amount, form: true, icon: 'mdi-check-circle-outline', info: 'Транзакция прошла успешно', color: 'green', textError: '' }


      } catch (error) {
        console.error('Error during transaction:', error);
        this.dialog = { account, recipientAddress, amount, form: true, icon: 'mdi-alert-outline', info: 'Произошла ошибка', color: 'red', textError: 'Описание текста ошибки' }
      }
    },

    closeDialog () {
      this.dialog = {
        ...this.dialog,
        form: false,
        textError: ''
      }
    }

  }
})

export default useSystemStore