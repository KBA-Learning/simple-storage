import { useState } from 'react'
import { abi, contract } from './artifacts.json'
import { BrowserProvider } from 'ethers'
import { Contract } from 'ethers'

function App() {
  const [input, setInput] = useState('')
  const [account, setAccount] = useState('Connect to MetaMask')
  const [output, setOutput] = useState('')

  const provider = new BrowserProvider(window.ethereum)

  function handleChange(event) {
    setInput(event.target.value)
  }

  async function connectMetaMask() {
    const signer = await provider.getSigner()

    setAccount(signer.address)
  }

  async function setValue() {
    try {
      const signer = await provider.getSigner()
      const instance = new Contract(contract, abi, signer)

      const trx = await instance.set(input)
      console.log('Transaction Hash:', trx.hash)
      if (trx) {
        waitForReceipt(trx.hash)
      } else {
        alert('Failed to Set')
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function waitForReceipt(trx) {
    let trxReceipt = null

    while (!trxReceipt) {
      try {
        trxReceipt = await provider.getTransactionReceipt(trx)

        if (!trxReceipt) {
          await new Promise((resolve) => setTimeout(resolve, 1000))
        }
      } catch (error) {
        console.error('Error fetching transaction receipt:', error)
      }
    }

    console.log('Receipt: ', trxReceipt)
    alert('Set Successfully')
  }

  async function getValue() {
    const signer = await provider.getSigner()
    const instance = new Contract(contract, abi, signer)

    const result = await instance.get()
    if (result) {
      setOutput(result)
    }
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <p className="font-bold text-2xl py-4">Sample Dapp</p>
      <button
        onClick={connectMetaMask}
        className="bg-blue-400 hover:bg-blue-700 rounded text-white py-2 px-6"
      >
        {account}
      </button>
      <p className="font-bold text-xl py-4">Set Message</p>
      <input
        type="text"
        onChange={handleChange}
        className="border border-gray-400 py-4 px-6 rounded"
        placeholder="Enter your Message"
      ></input>
      <br />
      <button
        onClick={setValue}
        className="bg-blue-400 hover:bg-blue-700 rounded text-white py-2 px-6"
      >
        Set
      </button>
      <p className="font-bold text-xl py-4">Get Message</p>
      <button
        onClick={getValue}
        className="bg-blue-400 hover:bg-blue-700 rounded text-white py-2 px-6"
      >
        Get
      </button>
      <p className="font-bold text-2xl py-4">{output}</p>
    </div>
  )
}

export default App
