import { ethers } from "hardhat";
import CollectionFactoryAbi from "../../abis/CollectionFactory.json";
import CommitteeAbi from "../../abis/Committee.json";
import CollectionAbi from "../../abis/Collection.json";
import tests from "./validateWearables.tests.json";

const contracts = {
  collectionFactoryV2: "0xb549b2442b2bd0a53795bc5cdcbfe0caf7aca9f8",
  collectionFactoryV3: "0x3195e88ae10704b359764cb38e429d24f1c2f781",
  oldCommittee: "0x71d9350ef44e1e451f00e447c0dff2d1fb75510a",
  committee: "0xaeec95a8aa671a6d3fec56594827d7804964fa70",
};

async function main() {
  const test = tests[0];

  const factoryV2 = new ethers.Contract(contracts.collectionFactoryV2, CollectionFactoryAbi, ethers.provider);
  const factoryV3 = new ethers.Contract(contracts.collectionFactoryV3, CollectionFactoryAbi, ethers.provider);
  const oldCommittee = new ethers.Contract(contracts.oldCommittee, CommitteeAbi, ethers.provider);
  const committee = new ethers.Contract(contracts.committee, CommitteeAbi, ethers.provider);
  const collection = new ethers.Contract(test.params.collection, CollectionAbi, ethers.provider);

  const options = { blockTag: test.block };

  const sender = test.params.sender;
  const itemId = test.params.itemId;
  const contentHash = test.params.contentHash;

  const isCollectionFromFactoryV2 = await factoryV2.isCollectionFromFactory(collection.address, options);
  console.log("isCollectionFromFactoryV2", isCollectionFromFactoryV2);

  const isCollectionFromFactoryV3 = await factoryV3.isCollectionFromFactory(collection.address, options);
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

  const addressHasAccess = creator === sender || globalManager || itemManager;
  console.log("addressHasAccess", addressHasAccess);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
