import { ethers } from "hardhat";
import LANDAbi from "../abis/LAND.json";
import EstateAbi from "../abis/Estate.json";

async function main() {
  const landAddress = "0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d";
  const estateAddress = "0x959e104e1a4db6317fa58f8295f586e1a978c297";
  const land = new ethers.Contract(landAddress, LANDAbi, ethers.provider);
  const estate = new ethers.Contract(estateAddress, EstateAbi, ethers.provider);
  const block = 16578039;
  const options = { blockTag: block };

  const sender = "0xa31f1f0d6bbd919bb3adab8da5835ed13e21f32a";
  const x = -17;
  const y = -37;

  const landId = await land.encodeTokenId(x, y, options);
  console.log("landId", landId.toString());
  
  const landOwner = await land.ownerOf(landId, options);
  console.log("landOwner", landOwner);
  console.log("sender == landOwner", sender == landOwner);

  const landApproved = await land.getApproved(landId, options);
  console.log("landApproved", landApproved);
  console.log("landApproved == sender", landApproved == sender);

  const landUpdateOperator = await land.updateOperator(landId, options);
  console.log("landUpdateOperator", landUpdateOperator);
  console.log("landUpdateOperator == sender", landUpdateOperator == sender);

  const landIsApprovedForAll = await land.isApprovedForAll(landOwner, sender, options);
  console.log("landIsApprovedForAll", landIsApprovedForAll);

  const landUpdateManager = await land.updateManager(landOwner, sender, options);
  console.log("landUpdateManager", landUpdateManager);

  const estateIsOwner = landOwner.toLowerCase() === estate.address;
  console.log("estateIsOwner", estateIsOwner);

  if (estateIsOwner) {
    const estateId = await estate.getLandEstateId(landId, options);
    console.log("estateId", estateId.toString());

    const estateOwner = await estate.ownerOf(estateId, options);
    console.log("estateOwner", estateOwner);
    console.log("estateOwner === sender", estateOwner === sender);

    const estateApproved = await estate.getApproved(estateId, options);
    console.log("estateApproved", estateApproved);
    console.log("estateApproved === sender", estateApproved === sender);

    const estateUpdateOperator = await estate.updateOperator(estateId, options);
    console.log("estateUpdateOperator", estateUpdateOperator);
    console.log("estateUpdateOperator === sender", estateUpdateOperator === sender);

    const estateIsApprovedForAll = await estate.isApprovedForAll(estateOwner, sender, options);
    console.log("estateIsApprovedForAll", estateIsApprovedForAll);

    const estateUpdateManager = await estate.updateManager(estateOwner, sender, options);
    console.log("estateUpdateManager", estateUpdateManager);
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
