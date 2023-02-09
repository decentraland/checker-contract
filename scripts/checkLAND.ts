import hre, { ethers } from "hardhat";
import { Checker__factory } from "../typechain-types";
import { bytecode } from "./bytecode.json";

const checkerAddress = ethers.Wallet.createRandom().address;
const checkerInterface = Checker__factory.createInterface();

const contracts = {
  land: "0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d",
  estate: "0x959e104e1a4db6317fa58f8295f586e1a978c297",
};

const suites = [
  {
    params: {
      sender: "0xE37129c296F3348ADDf6061E4dFB4e4f2385a86f",
      x: -88,
      y: 12,
    },
    block: 16473574,
    expected: true,
  },
  {
    params: {
      sender: "0xa31f1f0d6bbd919bb3adab8da5835ed13e21f32a",
      x: -17,
      y: 37,
    },
    block: 16578039,
    expected: true,
  },
  {
    params: {
      sender: "0xa31f1f0d6bbd919bb3adab8da5835ed13e21f32a",
      x: -17,
      y: 37,
    },
    block: 16578015,
    expected: true,
  },
];

async function main() {
  for (let i = 0; i < suites.length; i++) {
    try {
      const { params, block, expected } = suites[i];

      const hex = await hre.network.provider.send("eth_call", [
        {
          to: checkerAddress,
          data: checkerInterface.encodeFunctionData("checkLAND", [
            params.sender,
            contracts.land,
            contracts.estate,
            params.x,
            params.y,
          ]),
        },
        ethers.utils.hexlify(block),
        {
          [checkerAddress]: {
            code: bytecode,
          },
        },
      ]);

      const hasAccess = checkerInterface.decodeFunctionResult("checkLAND", hex)[0];

      hasAccess === expected ? console.log("SUCCESS") : console.error("FAILURE");
    } catch (e) {
      console.error("FAILURE: ", (e as Error).message);
    }
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
