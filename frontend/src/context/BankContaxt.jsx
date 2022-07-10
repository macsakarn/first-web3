import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import { contractABI, contractAddress } from "../util/constants";

export const BankContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const bankContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );

  return bankContract
};

export const BankProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [accounts, setAccounts] = useState([]);
  const [formCreateAccount, setFormCreateAccount] = useState({name:''});

  const handleCreateAccount = (event) => {
    setFormCreateAccount({ name : event.target.value})
  }

  const createAccount = async () =>{
    try {
        if (!ethereum) return alert("Please install metamask");
        if (ethereum){
            const {name} = formCreateAccount
            const bankContract = getEthereumContract()
            await bankContract.createAccount(name)
            setFormCreateAccount({name:''})
        }
    } catch (error) {
        console.log(err);

        throw new Error("No ether object");
    }
  }

  const checkWalletIsConnected = async () => {
    try {
      if (!ethereum) return alert("Please install metamask");

      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.lenght) {
        setCurrentAccount(accounts[0]);
      } else {
        console.log("No accounts");
      }
    } catch (error) {
      console.log(err);

      throw new Error("No ether object");
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install metamask");

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentAccount(accounts[0]);
    } catch (err) {
      console.log(err);

      throw new Error("No ether object");
    }
  };

  //ข้อมูลบัญชีทั้งหมด
  const getListAccount = async () =>{
    try {
        let accounts = []
        if (!ethereum) return alert("Please install metamask");
2
        const bankContract = getEthereumContract()

        const num = await bankContract.getAccountCount()
        const numAccount = ethers.BigNumber.from(num._hex).toNumber()
        if(numAccount > 0){
            for (let i = 0; i < numAccount; i++) {
                let account = await bankContract.getAccount(i)
                accounts.push({
                    id: i,
                    name: account._name,
                    balance: ethers.BigNumber.from(account._balance).toNumber(),
                    isDeposit: false,
                    isWithdraw: false,
                })
               
            }
            setAccounts(accounts)
        }
    } catch (error) {
        console.log(err);

        throw new Error("No ether object");
    }
  }

  useEffect(() => {
    checkWalletIsConnected();
  }, []);

  return (
    <BankContext.Provider value={{ connectWallet, currentAccount, getListAccount, accounts, handleCreateAccount, createAccount, setAccounts }}>
      {children}
    </BankContext.Provider>
  );
};
