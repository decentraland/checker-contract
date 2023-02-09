import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.16",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  networks: {
    polygon: {
      url: "https://rpc.decentraland.org/polygon",
    },
    mainnet: {
      url: "https://rpc.decentraland.org/mainnet",
    },
  },
};

export default config;
