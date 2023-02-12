import { ethers } from "hardhat";
import CollectionFactoryAbi from "../abis/CollectionFactory.json";
import CommitteeAbi from "../abis/Committee.json";
import CollectionAbi from "../abis/Collection.json";

async function main() {
  const factoryV2Address = "0xb549b2442b2bd0a53795bc5cdcbfe0caf7aca9f8";
  const factoryV3Address = "0x3195e88ae10704b359764cb38e429d24f1c2f781";
  const collectionAddress = "0x336bd8da16807f8e542c83ab3789813c9a726ae6";
  const oldCommitteeAddress = "0x71d9350ef44e1e451f00e447c0dff2d1fb75510a";
  const committeeAddress = "0xaeec95a8aa671a6d3fec56594827d7804964fa70";

  const factoryV2 = new ethers.Contract(factoryV2Address, CollectionFactoryAbi, ethers.provider);
  const factoryV3 = new ethers.Contract(factoryV3Address, CollectionFactoryAbi, ethers.provider);
  const collection = new ethers.Contract(collectionAddress, CollectionAbi, ethers.provider);
  const oldCommittee = new ethers.Contract(oldCommitteeAddress, CommitteeAbi, ethers.provider);
  const committee = new ethers.Contract(committeeAddress, CommitteeAbi, ethers.provider);

  const block = 39221633;
  const options = { blockTag: block };

  const sender = "0x5ce9fb617333b8c5a8f7787710f7c07002cb3516";
  const itemId = "0";
  const contentHash = "bafkreib45owymjtcipk5cthhjthg4mk4q5d4ecyv72i5rp352mvuneh2gm";

  const isCollectionFromFactoryV2 = await factoryV2.isCollectionFromFactory(collectionAddress, options);
  console.log("isCollectionFromFactoryV2", isCollectionFromFactoryV2);

  const isCollectionFromFactoryV3 = await factoryV3.isCollectionFromFactory(collectionAddress, options);
  console.log("isCollectionFromFactoryV3", isCollectionFromFactoryV3);

  const item = await collection.items(itemId, options);
  console.log("item.contentHash", item.contentHash);

  const isOldCommitteeMember = await oldCommittee.members(sender, options);
  console.log("isOldCommitteeMember", isOldCommitteeMember);

  const isCommitteeMember = await committee.members(sender, options);
  console.log("isCommitteeMember", isCommitteeMember);

  console.log("item.contentHash === contentHash", item.contentHash === contentHash);

  const creator = await collection.creator(options);
  console.log("creator", creator);
  console.log("creator === sender", creator.toLowerCase() === sender);

  const globalManager = await collection.globalManagers(sender, options);
  console.log("globalManager", globalManager);

  const itemManager = await collection.itemManagers(itemId, sender, options);
  console.log("itemManager", itemManager);

  const isApproved = await collection.isApproved(options);
  console.log("isApproved", isApproved);

  const isCompleted = await collection.isCompleted(options);
  console.log("isCompleted", isCompleted);

  const isCollectionValid = !isApproved && isCompleted;
  console.log("isCollectionValid", isCollectionValid);

  const addressHasAccess = creator === sender || globalManager || itemManager
  console.log("addressHasAccess", addressHasAccess);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
