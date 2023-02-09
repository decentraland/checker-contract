import hre, { ethers } from "hardhat";
import { Checker__factory } from "../typechain-types";
import { bytecode } from "./bytecode.json";

async function main() {
  const checkerAddress = ethers.Wallet.createRandom().address;
  const checkerInterface = Checker__factory.createInterface();

  const res = await hre.network.provider.send("eth_call", [
    {
      to: checkerAddress,
      data: checkerInterface.encodeFunctionData("checkLAND", [
        "0xE37129c296F3348ADDf6061E4dFB4e4f2385a86f",
        "0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d",
        "0x959e104e1a4db6317fa58f8295f586e1a978c297",
        -88,
        12,
      ]),
    },
    ethers.utils.hexStripZeros(ethers.utils.hexlify(16473574)),
    {
      [checkerAddress]: {
        code: bytecode,
      },
    },
  ]);

  console.log(checkerInterface.decodeFunctionResult("checkLAND", res));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
