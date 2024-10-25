import { createPublicClient, http, createWalletClient, parseEther } from 'viem'
import config from '@/config/index.ts'
import { sepolia } from 'viem/chains'
import { privateKeyToAccount } from 'viem/accounts'

const { privateKey, urlPrc } = config
const providerUrl = `https://sepolia.infura.io/v3/${urlPrc}`

const client = createPublicClient({
  chain: sepolia,
  transport: http(providerUrl)
})


const wallet = createWalletClient({
  chain: sepolia,
  transport: http(providerUrl),
  account: privateKeyToAccount(`0x${privateKey}`),
})

export {
  client,
  wallet
}
