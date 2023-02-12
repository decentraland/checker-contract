import hre, { ethers } from "hardhat";
import { Checker__factory } from "../typechain-types";
import { bytecode } from "./bytecode.json";
import tests from "./validateWearables.tests.json";

const checkerAddress = ethers.Wallet.createRandom().address;
const checkerInterface = Checker__factory.createInterface();

const contracts = {
  factory1: "0xb549b2442b2bd0a53795bc5cdcbfe0caf7aca9f8",
  factory2: "0x3195e88ae10704b359764cb38e429d24f1c2f781",
  committee1: "0x71d9350ef44e1e451f00e447c0dff2d1fb75510a",
  committee2: "0xaeec95a8aa671a6d3fec56594827d7804964fa70",
};

async function main() {
  for (let i = 0; i < tests.length; i++) {
    try {
      const { params, block, expected } = tests[i];

      const hex = await hre.network.provider.send("eth_call", [
        {
          to: checkerAddress,
          data: checkerInterface.encodeFunctionData("validateWearables", [
            params.sender,
            [contracts.factory1, contracts.factory2],
            params.collection,
            params.itemId,
            params.contentHash,
            [contracts.committee1, contracts.committee2],
          ]),
        },
        ethers.utils.hexStripZeros(ethers.utils.hexlify(block)),
        {
          [checkerAddress]: {
            code: bytecode,
          },
        },
      ]);

      const hasAccess = checkerInterface.decodeFunctionResult("validateWearables", hex)[0];

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
