import hre, { ethers } from "hardhat";
import { Checker__factory } from "../../typechain-types";
import { bytecode } from "../bytecode.json";
import { tests } from "./checkLAND.tests";

const checkerAddress = ethers.Wallet.createRandom().address;
const checkerInterface = Checker__factory.createInterface();

const contracts = {
  land: "0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d",
  estate: "0x959e104e1a4db6317fa58f8295f586e1a978c297",
};

async function main() {
  const hex = await hre.network.provider.send("eth_call", [
    {
      to: checkerAddress,
      data: checkerInterface.encodeFunctionData("multicall", [
        tests.map((test) =>
          checkerInterface.encodeFunctionData("checkLAND", [
            test.params.sender,
            contracts.land,
            contracts.estate,
            test.params.x,
            test.params.y,
          ])
        ),
      ]),
    },
    "latest",
    {
      [checkerAddress]: {
        code: bytecode,
      },
    },
  ]);

  console.log(checkerInterface.decodeFunctionResult("multicall", hex)[0]);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
