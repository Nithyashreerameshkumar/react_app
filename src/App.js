import './App.css';
import web3 from './web3';
import React ,{useState,useEffect} from "react";
import {tokenaddress,abierc} from './abi';
import {stakeaddress,abistake} from './abi';
import {useRef} from "react";
function App() {
const[walletconnect,setwalletconnect] = useState("");
const ToptalToken  = new web3.eth.Contract(abierc,tokenaddress);
const staking = new web3.eth.Contract(abistake,stakeaddress);
const[Stakeamount,setsAmount]=useState("");
const inputs_amt = useRef(null);
const[Unstakeamount,setuAmount]=useState("");
const inputu_amt = useRef(null);
const[amount,setAmount]=useState("");
const inputamt = useRef(null);
const[address,setaddr]=useState("");
const inputaddr = useRef(null);
const connect = async()=>{
  let accounts=await web3.eth.getAccounts();
     // web3.eth.getChainId().then(console.log);
     // const networkid=await web3.eth.getChainId();
     // console.log("network id",networkid);
await web3.eth.getAccounts().then(()=>{          
          console.log("acc Ethereum",accounts[0]);
          setwalletconnect(accounts[0]);
          window.wallet=accounts[0];
         localStorage.setItem("wallet",accounts[0]);})}
         //sessionStorage.setItem("wallet", accounts[0]);
         
const Stake = async(val)=>{
  console.log("staking....",val);
  const accounts = await  web3.eth.getAccounts();
  await staking.methods.stake(web3.utils.toBN(val*1000000)).send({from:accounts[0]});
}
const Approve =async(val)=>{
  console.log("claiming reward...");
  const accounts = await  web3.eth.getAccounts();
  await ToptalToken.methods.approve(address,web3.utils.toBN(val*1000000)).send({from:accounts[0]});
}
const Unstake = async(val)=>{
  console.log("unstaking....",val);
  const accounts = await  web3.eth.getAccounts();
  await staking.methods.unstake(web3.utils.toBN(val*1000000)).send({from:accounts[0]});
}
const Claimreward = async()=>{
  const accounts = await web3.eth.getAccounts();
  await staking.methods.claimreward().send({from:accounts[0]});
}
function handlestake() {
  console.log("staking....");
  console.log(inputs_amt.current.value);
  let a=inputs_amt.current.value;
  setsAmount(a*1000000);
  Stake(a);
}
function handleunstake(){
console.log("unstaking....");
console.log(inputu_amt.current.value);
let b=inputu_amt.current.value;
setuAmount(b*1000000);
Unstake(b);
}
function handleapprove(){
  console.log("approving.....");
  console.log(inputamt.current.value);
  console.log(inputaddr.current.value);
  let c=inputamt.current.value;
  let d=inputaddr.current.value;
  setaddr(d);
  setAmount(c*1000000);
  Approve(c);
  }

  return (
    <div className="App"><p>WALLET CONNECT:</p>
      <button onClick={()=>connect()}>connectwallet</button>
      {walletconnect}
       <br/>
       <br/><p>STAKE:</p>
       <label>Amount</label>&nbsp;&nbsp;<input ref={inputs_amt}
        type="text"
        id="amt"
        name="amt"/>&nbsp;&nbsp;<br/><br/>
     <button onClick={handlestake}>stake</button>&nbsp;&nbsp;&nbsp;
     <p>{Stakeamount}</p>
     <br/><p>UNSTAKE:</p>
     <label>Amount</label>&nbsp;&nbsp;<input ref={inputu_amt}
        type="text"
        id="amt"
        name="amt"/>&nbsp;&nbsp;<br/><br/>
    <button onClick={handleunstake}>unstake</button>&nbsp;&nbsp;&nbsp;
    <p>{Unstakeamount}</p><br/>
    <p>APPROVE:</p>
    <label>Address</label><input ref={inputaddr}
        type="text"
        id="address"
        name="address"/>&nbsp;&nbsp;&nbsp;
     <label>Amount</label>&nbsp;&nbsp;<input ref={inputamt}
        type="text"
        id="amt"
        name="amt"/>&nbsp;&nbsp;<br/><br/>
    <button onClick={handleapprove}>approve</button>&nbsp;&nbsp;&nbsp;
    <p>{amount}</p>
    <p>{address}</p><br/>
    <p>CLAIM REWARD:</p>
    <button onClick={Claimreward}>claim reward</button>

  </div>
  );}
export default App;
