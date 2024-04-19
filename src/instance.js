import { Contract, JsonRpcProvider, Wallet } from 'ethers'
import { abi, contract } from './artifacts.json'

const provider = new JsonRpcProvider('<your-api-url>')
const wallet = new Wallet('<your-private-key>', provider)
export const instance = new Contract(contract, abi, wallet)
