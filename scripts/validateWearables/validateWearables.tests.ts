export function getTestsForNetwork(network: string) {
  switch (network) {
    case "matic":
      return [
        {
          params: {
            sender: "0xb3ab3a2f58a7d91fe3dcf9abad53c0dd1603b847",
            collection: "0x09d4ff98bdf09d3ee1fd88d31f8bdedfdf79c121",
            itemId: "1",
            contentHash:
              "bafkreig4h6ofbbdsxnx42vwucu5m66gn6z3fvz2pysceaehwhylxdyifre",
          },
          block: 15754060,
          expected: true,
        },
        {
          params: {
            sender: "0xb3ab3a2f58a7d91fe3dcf9abad53c0dd1603b847",
            collection: "0x09d4ff98bdf09d3ee1fd88d31f8bdedfdf79c121",
            itemId: "1",
            contentHash:
              "bafkreig4h6ofbbdsxnx42vwucu5m66gn6z3fvz2pysceaehwhylxdyifre",
          },
          block: 15753913,
          expected: true,
        },
      ];
    case "mumbai":
      return [
        {
          params: {
            sender: "0x2a39d4f68133491f0442496f601cde2a945b6d31",
            collection: "0xaa480a9472ac09ba614ecd8261b15ec81b96e9e0",
            itemId: "0",
            contentHash:
              "bafkreiekdezwak5s3wj7qa3od4lwecv2nkgmkk763fuyjt25pl66he3mua",
          },
          block: 38292012,
          expected: true,
        },
      ];
    default:
      throw new Error(`Network ${network} not supported`);
  }
}
