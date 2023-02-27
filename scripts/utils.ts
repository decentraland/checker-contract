export function getContractsForNetwork(network: string) {
  switch (network) {
    case "mainnet":
      return {
        LAND: "0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d",
        ESTATE: "0x959e104e1a4db6317fa58f8295f586e1a978c297",
      };
    case "goerli":
      return {
        LAND: "0x25b6B4bac4aDB582a0ABd475439dA6730777Fbf7",
        ESTATE: "0xC9A46712E6913c24d15b46fF12221a79c4e251DC",
      };
    default:
      throw new Error(`Network ${network} not supported`);
  }
}
