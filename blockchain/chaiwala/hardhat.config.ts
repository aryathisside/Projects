import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-ethers";

const config: HardhatUserConfig = {
    solidity: {
        compilers: [
          {
            version: "0.8.17",
          },
          {
            version: "0.8.4",
          },
        ],
      },
    paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  networks: {
    hardhat: {},
    localhost: {
      url: "http://127.0.0.1:8545"
    }
  }
};

export default config;
