"use client"

import useStore from '@/store/store';
import { useState } from 'react';
import Image from 'next/image';
import { Contract } from 'ethers';
import { CONTRACT_ADDRESS,CONTRACT_ABI } from '@/constants';
import { ethers } from 'ethers';
import Confettis from './Confettis';
import { IoIosClose } from "react-icons/io";
import LottieAnimation from './LottieAnimation';
import { useWeb3ModalProvider } from '@web3modal/ethers5/react'

const Form = ( {connectMetamask} ) => {
    // console.log(isOwner)
    const { connected,setShowPopup, isOwner, buttonSelected, showTansaction, setShowTansaction } = useStore();
    const { walletProvider } = useWeb3ModalProvider()

    const initialForm = {
      name: "",
      message: "",
      amount: "",
      customAmount: "",
    };

    const [form, setForm] = useState(initialForm);
    const [loading, setLoading] = useState(false);
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [transactionStatus, setTransactionStatus] = useState(null);
    
    const WalletSelected = async () => {
      if (buttonSelected === "metamask") {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        return signer;
      }
      else if (buttonSelected === "walletconnect") {
        const provider = new ethers.providers.Web3Provider(walletProvider);
        const signer = provider.getSigner();
        console.log("wallet connect is beign used", signer)
        return signer;

      } else {
        throw new Error ("No wallet selected")
      }
    }

    // Main function which calls solidity function
    const getDonation = async(e) => {

      try {
        e.preventDefault();
        setShowTansaction(true);
        console.log("sending Donation");
        setLoading(true);
        const signer = await WalletSelected();
        const smartContract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
        const amount = ethers.utils.parseEther(form.amount || form.customAmount);
        const txn = await smartContract.sendDonation(form.message,form.message,{value: amount })
        await txn.wait();
        setLoading(false);
        setForm(initialForm);
        setIsConfirmed(true);
        setTransactionStatus('success');
        setTimeout(() => {
          setIsConfirmed(false);
        }, 5000);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setTransactionStatus('failed');
      }
    }

    const withdraw = async () => {
      try {
        console.log("withdrawing")
        const signer = await getProviderOrSigner(true);
        const smartContract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
        const txn = await smartContract.withdraw();
        await txn.wait();
      } catch (error) {
        console.log(error)
      }
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
            amount: e.target.name === 'customAmount' ? '' : form.amount,
        });
    };

  return (
    <>
      <form
        onSubmit={getDonation}
        className="border-1 border-black bg-white shadow-md rounded-2xl md:px-10 px-6 pt-6 pb-8 mb-4"
      >
        <h1 className="mb-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-6xl dark:text-white">
          Support a{" "}
          <span className="text-blue-600 dark:text-blue-500 underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">
            Cause
          </span>
        </h1>
        <div className="mb-4">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <input
            className="h-20 shadow appearance-none border rounded w-full px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="message"
            type="text"
            placeholder="Message"
            name="message"
            value={form.message}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4 flex items-center justify-center">
          <Image
            src="/donation.png"
            alt="Donation icon"
            width={45}
            height={45}
          ></Image>
          <p className="mx-2 text-xl mt-4">X</p>
          <div className="flex md:text-base text-sm" required>
            <button
              type="button"
              onClick={() => setForm({ ...form, amount: "0.01" })}
              className={`mx-1 mt-4 font-bold py-2 md:px-3 px-1 rounded focus:outline-none focus:shadow-outline border border-blue-500 hover:bg-blue-500 hover:text-white ${
                form.amount === "0.01"
                  ? "bg-blue-500 text-white"
                  : "text-blue-500"
              }`}
            >
              0.01
            </button>
            <button
              type="button"
              onClick={() => setForm({ ...form, amount: "0.05" })}
              className={`mx-1 mt-4 font-bold py-2 md:px-3 px-1 rounded focus:outline-none focus:shadow-outline border border-blue-500 hover:bg-blue-500 hover:text-white ${
                form.amount === "0.05"
                  ? "bg-blue-500 text-white"
                  : "text-blue-500"
              }`}
            >
              0.05
            </button>
            <button
              type="button"
              onClick={() => setForm({ ...form, amount: "0.1" })}
              className={`mx-1 mt-4 font-bold py-2 md:px-3 px-1 rounded focus:outline-none focus:shadow-outline border border-blue-500 hover:bg-blue-500 hover:text-white ${
                form.amount === "0.1"
                  ? "bg-blue-500 text-white"
                  : "text-blue-500"
              }`}
            >
              0.10
            </button>
            <input
              type="number"
              name="customAmount"
              value={form.customAmount}
              onChange={handleChange}
              min="0"
              step="0.01"
              className="mx-1 md:px-3 px-1 mt-4 shadow appearance-none border rounded w-full py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Custom Amount"
              style={{ appearance: "textfield" }}
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          {connected ? (
            <button
              className="cursor-pointer w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-2xl focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Donate
            </button>
          ) : (
            <button
              className="cursor-pointer w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-2xl focus:outline-none focus:shadow-outline"
              type="button"
              onClick={() => setShowPopup((prev) => !prev)}
            >
              Connect Wallet
            </button>
          )}
        </div>

        {isOwner && (
          <button
            onClick={withdraw}
            className="w-1/2 flex justify-center items-center rounded-2xl p-2 bg-green-400 mt-3"
          >
            Withdraw
          </button>
        )}
      </form>

      {/* Transaction Popup */}
      {showTansaction && (
        <div
          className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50"
          onClick={() => setShowTansaction(false)}
        >
          <div className="absolute w-full h-full bg-black opacity-20"></div>
          <div
            className="relative flex flex-col items-start justify-center bg-black border-2 border-gray-400 p-4 md:w-1/4 w-3/4 md:h-60 h-auto rounded-lg z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <h1 className="md:absolute top-4 left-4 text-2xl font-mono font-bold text-slate-50 text-white">
              Status
            </h1>
            <button
              className="absolute top-2 right-2 text-white font-bold text-4xl hover:text-red-200"
              onClick={() => setShowTansaction(false)}
            >
              <IoIosClose />
            </button>

            <div className="w-full flex flex-col py-2 rounded">
              {loading ? (
                <div className="flex items-center justify-center">
                  {/* <div className="relative">
                    <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
                    <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin"></div>
                  </div> */}
                  <img class="w-16 h-16 animate-spin" src="https://www.svgrepo.com/show/199956/loading-loader.svg" alt="Loading icon"></img>
                </div>
              ) : transactionStatus === "success" ? (
                <>
                  <div className="relative justify-center">
                    {/* Replace with your animated green tick */}
                    <LottieAnimation
                      animationPath="success.json"
                      width={100}
                      height={100}
                    />
                  </div>
                  <p className="text-white font-bold flex justify-center">
                    Transaction Successful!
                  </p>
                </>
              ) : transactionStatus === "failed" ? (
                <>
                  <div className="relative justify-center">
                    <LottieAnimation
                      animationPath="close.json"
                      width={100}
                      height={100}
                    />
                  </div>
                  <p className="text-white font-bold flex justify-center">
                    Transaction failed
                  </p>
                  {/* <Confettis /> */}
                </>
              ) : (
                <p>Something went wrong! Please try again </p>
              )}
            </div>
          </div>
        </div>
      )}

      {isConfirmed && <Confettis />}
    </>
  );
}

export default Form