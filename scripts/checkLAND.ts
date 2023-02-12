import hre, { ethers } from "hardhat";
import { Checker__factory } from "../typechain-types";
import { bytecode } from "./bytecode.json";
import tests from "./checkLAND.tests.json";

const checkerAddress = ethers.Wallet.createRandom().address;
const checkerInterface = Checker__factory.createInterface();

const contracts = {
  land: "0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d",
  estate: "0x959e104e1a4db6317fa58f8295f586e1a978c297",
};

async function main() {
  for (let i = 0; i < tests.length; i++) {
    try {
      const { params, block, expected } = tests[i];

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
        ethers.utils.hexStripZeros(ethers.utils.hexlify(block)),
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
