"use client"

import { createWeb3Modal,defaultConfig } from "@web3modal/ethers5/react";

const projectId = "ca665b79e41a07323c96109d6bf02619";

// const mainnet = { 
//   chainId: 1,
//   name: 'Ethereum',
//   currency: 'ETH',
//   explorerUrl: 'https://etherscan.io',
//   rpcUrl: 'https://cloudflare-eth.com',
// }

const sepolia = {
  chainId: 11155111,
  name: 'Sepolia',
  currency: 'ETH',
  explorerUrl: 'https://etherscan.io',
  rpcUrl: 'https://rpc2.sepolia.org',
}

const metadata = {
  name: 'CharitableX',
  description: 'Make Direct Donations to Charities with Crypto',
  url: '',
  icon : '', 
}

createWeb3Modal({
  ethersConfig: defaultConfig({
    metadata,
    defaultChainId: 11155111,
    enableInjected: true,
    enableCoinbase: true,
  }),
  chains: [sepolia],
  projectId,
  enableAnalytics: true,
});

export default function Web3Modal({children}){
  return children
}