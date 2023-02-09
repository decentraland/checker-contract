# Checker Contract

## Development

Install dependencies with:

```
npm ci
```

## Bytecode

There is a `bytecode.json` file inside the scripts folder, it has to be regenerated every time the contract changes in order to be able to run:

- `checkLAND.ts`

To regenerate it, simply run:

```
$ npx hardhat run ./scripts/bytecode.ts
```

## CheckLAND

The `checkLAND.ts` script runs a bunch of defined calls to the checkLAND function in the contract.

You can run it with:

```
$ npx hardhat run ./scripts/checkLAND.ts --network mainnet
```

Test cases can be modified in the suites variable inside the script.
