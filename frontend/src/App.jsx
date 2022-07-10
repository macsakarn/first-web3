import { useState, useContext } from "react";
import { BankContext } from "./context/BankContaxt";
const App = () => {
  const { connectWallet, currentAccount, getListAccount, accounts, handleCreateAccount, createAccount } = useContext(BankContext);
  
  const [ isCreateAccount, setIsCreateAccount ] = useState(false)

  getListAccount()
 
  const listAccount =  accounts.map((val) => {
 
    return (
      <div className="rounded shadow-xl mt-10 h-60 w-full p-10 flex flex-col justify-between" key={val.id}>
        <div className="">
          <p> Account Name: {val.name} </p>
          <p> Balance : {val.balance}</p>
        </div>

        <div className="flex">
          <button className="bg-slate-700 text-white font-bold py-2 px-4 basis-1/3">
            Deposit
          </button>
          <button className="bg-slate-600 text-white font-bold py-2 px-4 basis-1/3">
            Withdraw
          </button>
          <button className="bg-slate-500 text-white font-bold py-2 px-4 basis-1/3">
            Transfer
          </button>
        </div>
      </div>
    )
  })

  return (
    <div className="container mx-auto px-96 pt-10">
      <div className="flex justify-between">
        <p className="logo text-2xl">🚀10xBank</p>
        {!currentAccount && (
          <button
            className="bg-slate-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => connectWallet()}
          >
            Connect wallet
          </button>
        )}
        {currentAccount && (
          <div
          className="bg-slate-500 text-white py-2 px-4 rounded"
        >
          {currentAccount.slice(0,10)}
        </div>
        )
        }
      </div>

      <div className="container mx-auto px-16 pt-10">
        <p className="text-xl">My Accounts:</p>
        {!isCreateAccount && (
          <div className="rounded shadow-md hover:shadow-xl mt-10 h-11 w-full flex justify-center align-middle cursor-pointer" onClick={() => setIsCreateAccount(true)}>
          + Create Bank Account
        </div>
        )}
        {isCreateAccount && (
          <div className="rounded shadow-xl mt-10 h-60 w-full p-10 flex flex-col justify-between">
          <div className="flex items-center">
            <p> Account Name: </p>

            <input
              type="text"
              className="mt-1 ml-3 w-60 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400"
              onChange={handleCreateAccount}
            />
          </div>
          <div className="flex flex-row-reverse">
            <button className="bg-slate-700 text-white font-bold py-2 px-4 rounded mx-2" onClick={()=>createAccount()}>
              Create
            </button>
            <button className="bg-slate-400 text-white font-bold py-2 px-4 rounded mx-2" onClick={() => setIsCreateAccount(false)}>
            Cancel
            </button>
          </div>
        </div>
        )}
        
        {listAccount}
        
      </div>
    </div>
  );
};

export default App;
