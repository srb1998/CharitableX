require("@nomicfoundation/hardhat-toolbox");

require("dotenv").config();

const { NEXT_BASE_KEY, NEXT_PRIVATE_KEY } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  networks: {
    base_sepolia: {
      url: NEXT_BASE_KEY,
      accounts: [NEXT_PRIVATE_KEY],
    },
  
  }
};
