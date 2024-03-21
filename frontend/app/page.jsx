"use client"

import useStore from "@/store/store";
import Navbar from "./components/Navbar";
import Form from "./components/Form";
import CarouselBanner from "./components/CarouselBanner";
import { ethers,Contract } from "ethers";
import InfiniteScroller from "./components/InfiniteScroller";
import { CONTRACT_ADDRESS,CONTRACT_ABI } from '@/constants';
import { useWeb3Modal, useWeb3ModalProvider, useWeb3ModalAccount } from '@web3modal/ethers5/react'


export default function Home() {
  const { connected, setConnected,buttonSelected, setUserAddress, setIsOwner,setButtonSelected,showPopup,setShowPopup } = useStore();
  const { address } = useWeb3ModalAccount()
  const { walletProvider } = useWeb3ModalProvider()
  const { open } = useWeb3Modal()

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

  const checkOwner = async (userAddress) => {
    try {
      const signer = await WalletSelected();
      const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      const owner = await contract.owner();
      console.log("Owner Address- ", owner);
      if (owner.toLowerCase() === userAddress.toLowerCase()) {
      setIsOwner(true);
      } else {
        setIsOwner(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

    //Connect Wallet Connect logic
    const connectWalletConnect = async () => {
      try {
        await open();
        const provider = new ethers.providers.Web3Provider(walletProvider);
        const signer = provider.getSigner();
        console.log("wallet connect signer- ",signer);
        setShowPopup(false);
        setConnected(true);
        const useraddress = address
        console.log(useraddress)
        setUserAddress(useraddress);
        checkOwner(useraddress);
        setButtonSelected("walletconnect")
      } catch (error) {
        console.log(error);
      }
    }

  const connectMetamask = async () => {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      try {
        await ethereum.request({ method: "eth_requestAccounts" });
        const signer = provider.getSigner();
        console.log(signer);
        const network = await provider.getNetwork();
        console.log(network.chainId);

        if (network.chainId !== 11155111) {
          window.alert("Change the Network to Sepolia Testnet");
          throw new Error("Change the Network to Sepolia Testnet");
        } else {
          console.log("Connected to Metamask");
          setShowPopup(false);
          setConnected(true);
          const useraddress = await signer.getAddress();
          setUserAddress(useraddress);
          checkOwner(useraddress);
          setButtonSelected("metamask");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Metamask not installed");
    }
  };
 
  const disconnectWallet = () => {
    if (window.ethereum) {
      window.ethereum.removeAllListeners();
      setConnected(false);
      setUserAddress("");
      setIsOwner(false);
    }
  }
  return (
    <>
      <main className="w-full flex min-h-screen flex-col items-center justify-start">
        <Navbar
          connectMetamask={connectMetamask}
          connectWalletConnect={connectWalletConnect}
          disconnectWallet={disconnectWallet}
          connected={connected}
          setShowPopup={setShowPopup}
          showPopup={showPopup}
        />
        <div className="flex flex-col md:flex-row justify-center w-full px-4 md:px-8 lg:px-16 items-stretch">
          <div className="md:w-2/3 md:mx-8 mx-2 flex">
            <Form
              connectMetamask={connectMetamask}
              connectWalletConnect={connectWalletConnect}
            />
          </div>
          <div className="w-full ">
            <CarouselBanner />
          </div>
        </div>

        <div className="w-1/2"></div>
        <div className="w-full">
          <InfiniteScroller />
        </div>
      </main>
    </>
  );
}
