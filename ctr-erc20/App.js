import './App.css';
import {useEffect, useState} from 'react';
import TokenArtifact from "./artifacts/Token.json";
import contractAddress from "./artifacts/contractAddress.json";
//import {Contract } from "ethers";
//import {ethers} from "ethers";
const ethers = require("ethers");
const ownerAddress ='0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
const iCost = 5;
const dCost = 7;

function App() {
  const [counter, setCounter] = useState(0)
  const [balance, setBalance] = useState(0)
  const [tokenData, setTokenData] = useState({}) 
 
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()

  async function _initialiseContract(init){
      const tokenContract = new ethers.Contract(
      contractAddress.Token,
      TokenArtifact,
      init
    )
  return(tokenContract)
  }

  async function _getTokenContractData(){
    const contract = await _initialiseContract(signer)
    const name = await  contract.name()
    const symbol = await contract.symbol()
    const counter= await contract.counter()
    setCounter(counter)
    const data = {name, symbol}
    setTokenData(data)
  }

  async function getBalance(){
    if(typeof window.ethereum !== 'undefined'){
      const contract = await _initialiseContract(signer)
      const [accounts] = await window.ethereum.request({method:"eth_requestAccounts"})
      const balance = await contract.balanceOf(accounts)
      console.log('balance', balance.toString())
      setBalance(balance.toString())
    } 
  }
 
  async function increment(){
    const contract = await _initialiseContract(signer)
    await contract.increment()
    await getBalance()
    const counter= await contract.counter()
    setCounter(counter)
  }
 
  async function decrement(){
    const contract = await _initialiseContract(signer)
    await contract.decrement()
    await getBalance()
    const counter= await contract.counter()
    setCounter(counter)
  }

  return (
    <>
    <div className="App">
      <button onClick={_getTokenContractData}>get token data</button>
        <h2> Name: {tokenData.name}</h2>
        <h2> Symbol: {tokenData.symbol}</h2>
        <h2> Counter: {counter}</h2>
        <button onClick={getBalance}>Get Balance</button>
        <h2> Balance: {balance}</h2>
      <button onClick={increment}> Increment </button>
      <button onClick={decrement}>Decrement</button>
    </div>
 </>
  );
}

export default App;
