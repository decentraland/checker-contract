import hre, { ethers } from "hardhat";
import { Checker__factory } from "../../typechain-types";
import { bytecode } from "../bytecode.json";
import { tests } from "./validateWearables.tests";

const checkerAddress = ethers.Wallet.createRandom().address;
const checkerInterface = Checker__factory.createInterface();

const contracts = {
  factories: [
    {
      address: "0xB549B2442b2BD0a53795BC5cDcBFE0cAF7ACA9f8",
      sinceBlock: 15202563,
    },
    {
      address: "0x3195e88aE10704b359764CB38e429D24f1c2f781",
      sinceBlock: 28121692,
    },
  ],
  commitees: [
    {
      address: "0x71d9350Ef44E1e451F00e447C0DfF2d1FB75510a",
      sinceBlock: 15202559,
    },
    {
      address: "0xaeec95a8aa671a6d3fec56594827d7804964fa70",
      sinceBlock: 19585299,
    },
  ],
};

async function main() {
  for (let i = 0; i < tests.length; i++) {
    try {
      const { params, block, expected } = tests[i];

      const factories = contracts.factories
        .filter(({ sinceBlock }) => block >= sinceBlock)
        .map(({ address }) => address);
      const commitees = contracts.commitees
        .filter(({ sinceBlock }) => block >= sinceBlock)
        .map(({ address }) => address);

      const hex = await hre.network.provider.send("eth_call", [
        {
          to: checkerAddress,
          data: checkerInterface.encodeFunctionData("validateWearables", [
            params.sender,
            factories,
            params.collection,
            params.itemId,
            params.contentHash,
            commitees,
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
      console.error("FAILURE: error", (e as Error).message);
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
