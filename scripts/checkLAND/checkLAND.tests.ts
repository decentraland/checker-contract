export function getTestsForNetwork(network: string) {
  switch (network) {
    case "mainnet":
      return [
        {
          params: {
            sender: "0x46d74130a3e15bb776b344d0f58752a388386679",
            x: -109,
            y: -8,
          },
          block: 16127223,
          expected: true,
        },
        {
          params: {
            sender: "0xE37129c296F3348ADDf6061E4dFB4e4f2385a86f",
            x: -88,
            y: 12,
          },
          block: 16473574,
          expected: true,
        },
        {
          params: {
            sender: "0xa31f1f0d6bbd919bb3adab8da5835ed13e21f32a",
            x: -17,
            y: -37,
          },
          block: 16578039,
          expected: true,
        },
        {
          params: {
            sender: "0xa31f1f0d6bbd919bb3adab8da5835ed13e21f32a",
            x: -17,
            y: -37,
          },
          block: 16578015,
          expected: true,
        },
        {
          params: {
            sender: "0x717a0f32a82f715f3577856c86ada43fb600831a",
            x: -67,
            y: -111,
          },
          block: 16744822,
          expected: true,
        },
        {
          params: {
            sender: "0x009249ad630734492f0081a09ed8c998c680ffe0",
            x: 142,
            y: -146,
          },
          block: 16750703,
          expected: true,
        },
        {
          params: {
            sender: "0x40c6a0AbB1ED3caa6A56d5dE3410Af2e6088EA23",
            x: 30,
            y: 71,
          },
          block: 16501894,
          expected: true,
        },
      ];
    default:
      throw new Error(`Network ${network} not supported`);
  }
}
