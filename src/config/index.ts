
interface TConfig {
  privateKey: string,
  account: string,
  contract: string,
  urlPrc: string,
  apiKey: string
}

const config: TConfig = {
  privateKey: import.meta.env.VITE_PRIVATE_KEY as string,
  account: import.meta.env.VITE_ACCOUNT as string,
  contract: import.meta.env.VITE_CONTRACT as string,
  urlPrc: import.meta.env.VITE_INFURA_API_KEY_SEPOLIA as string,
  apiKey: import.meta.env.VITE_ETHERSCAN_API_KEY as string
}

export default config