// require('@nomiclabs/hardhat-ethers');
require("@nomicfoundation/hardhat-toolbox");

require('dotenv').config();

const { SEPOLIA_URL, PRIVATE_KEY_FOR_DEPLOYER,PRIVATE_KEY_FOR_BUYER, PRIVATE_KEY_FOR_SELLER,PRIVATE_KEY_FOR_INSPECTOR, PRIVATE_KEY_FOR_LENDER } = process.env;

module.exports = {
  solidity: "0.8.20",  
  networks: {
    sepolia: {
      url: SEPOLIA_URL,
      accounts: [
              `0x${PRIVATE_KEY_FOR_DEPLOYER}`,
              `0x${PRIVATE_KEY_FOR_BUYER}`,
              `0x${PRIVATE_KEY_FOR_SELLER}`,
              `0x${PRIVATE_KEY_FOR_INSPECTOR}`,
              `0x${PRIVATE_KEY_FOR_LENDER}`,
            ],
    },
  },
};
