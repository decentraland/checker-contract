export function getTestsForNetwork(network: string) {
  switch (network) {
    case "mainnet":
      return [
        {
          params: {
            sender: "0xcc2621f8a1974d50631c85922f2b921867a397e1",
            name: "JimSedric",
          },
          block: 16738308,
          expected: true,
        },
        {
          params: {
            sender: "0xe1951ceca2cca5f7ebeb23b1dfdb8eb383f2eb1f",
            name: "akasya",
          },
          block: 16758615,
          expected: true,
        },
        {
          params: {
            sender: "0x7bc07eb3b7db966e4f6e5d439f8c33aff5f628b3",
            name: "Deidre",
          },
          block: 16738533,
          expected: true,
        },
        {
          params: {
            sender: "0xc8d76f7cf7793ce39d2cf6b06b7fdc29c70656d0",
            name: "ZESTY",
          },
          block: 16738504,
          expected: true,
        },
        {
          params: {
            sender: "0x4bd3548d6a0f1cb969a2688887104aa7889943b0",
            name: "Shaw",
          },
          block: 16738308,
          expected: true,
        },
      ];
    default:
      throw new Error(`Network ${network} not supported`);
  }
}
