import { ethers } from "hardhat";
import TPRAbi from "../../abis/TPR.json";
import tests from "./validateThirdParty.tests.json";

const contracts = {
  tpr: "0x1C436C1EFb4608dFfDC8bace99d2B03c314f3348",
};

async function main() {
  const test = tests[0];

  const tpr = new ethers.Contract(contracts.tpr, TPRAbi, ethers.provider);

  const options = { blockTag: test.block };

  const thirdParty = await tpr.thirdParties(test.params.tpId, options);
  console.log("thirdParty.isApproved", thirdParty.isApproved);
  console.log("thirdParty.root === test.params.root", thirdParty.root === ethers.utils.hexlify(test.params.root));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
