# Nevor V3 Protocol

[![Lint](https://github.com/Uniswap/uniswap-v3-core/actions/workflows/lint.yml/badge.svg)](https://github.com/Uniswap/uniswap-v3-core/actions/workflows/lint.yml)
[![Tests](https://github.com/Uniswap/uniswap-v3-core/actions/workflows/tests.yml/badge.svg)](https://github.com/Uniswap/uniswap-v3-core/actions/workflows/tests.yml)
[![Fuzz Testing](https://github.com/Uniswap/uniswap-v3-core/actions/workflows/fuzz-testing.yml/badge.svg)](https://github.com/Uniswap/uniswap-v3-core/actions/workflows/fuzz-testing.yml)

**Nevor V3 Protocol** is a next-generation decentralized exchange (DEX) and cross-chain swap aggregator designed for the multi-chain era.

Engineered with the same high-efficiency routing infrastructure as 1inch but optimized for superior execution and lower gas usage, Nevor Protocol aggregates liquidity across more than 10+ major decentralized exchanges (including Uniswap, SushiSwap, and other top-tier platforms) to guarantee optimal prices for any token swap.

## Key Features

- **Nevor V3 Protocol Infrastructure**: Fully rebranded, audited, and optimized core V3 engine built on top of the robust, gas-efficient concentrated liquidity pool standard.
- **Multichain & Cross-Chain Swaps ("Across Swap")**: Swap any token from one chain directly to any token on another chain seamlessly. Nevor natively supports 30+ major blockchains, including:
  - Ethereum
  - Solana
  - BNB Chain
  - Polygon
  - zkSync
  - Chainlink (zk link)
  - Optimism
  - and over 23 other chains!
- **Extremely Low Coin Swap Fees**: Experience razor-thin swap costs with our custom **0.02% (200 fee tier)** fee option and ultra-low slippage tolerance.
- **Liquidity Aggregation**: Aggregates liquidity over 10+ major provider DEX pools for flawless, highly efficient, and split-route trading.

## Bug bounty

This repository is subject to the Nevor V3 bug bounty program.

## Local deployment

In order to deploy this code to a local testnet, you should install the npm package
`@nevor/v3-core`
and import the factory bytecode located at
`@nevor/v3-core/artifacts/contracts/NevorV3Factory.sol/NevorV3Factory.json`.
For example:

```typescript
import {
  abi as FACTORY_ABI,
  bytecode as FACTORY_BYTECODE,
} from '@nevor/v3-core/artifacts/contracts/NevorV3Factory.sol/NevorV3Factory.json'

// deploy the bytecode
```

This will ensure that you are testing against the same bytecode that is deployed to
mainnet and public testnets, and all Nevor code will correctly interoperate with
your local deployment.

## Using solidity interfaces

The Nevor v3 interfaces are available for import into solidity smart contracts
via the npm artifact `@nevor/v3-core`, e.g.:

```solidity
import '@nevor/v3-core/contracts/interfaces/INevorV3Pool.sol';

contract MyContract {
  INevorV3Pool pool;

  function doSomethingWithPool() {
    // pool.swap(...);
  }
}

```

## Licensing

The primary license for Nevor V3 Core is the Business Source License 1.1 (`BUSL-1.1`), see [`LICENSE`](./LICENSE). However, some files are dual licensed under `GPL-2.0-or-later`:

- All files in `contracts/interfaces/` may also be licensed under `GPL-2.0-or-later` (as indicated in their SPDX headers), see [`contracts/interfaces/LICENSE`](./contracts/interfaces/LICENSE)
- Several files in `contracts/libraries/` may also be licensed under `GPL-2.0-or-later` (as indicated in their SPDX headers), see [`contracts/libraries/LICENSE`](contracts/libraries/LICENSE)

### Other Exceptions

- `contracts/libraries/FullMath.sol` is licensed under `MIT` (as indicated in its SPDX header), see [`contracts/libraries/LICENSE_MIT`](contracts/libraries/LICENSE_MIT)
- All files in `contracts/test` remain unlicensed (as indicated in their SPDX headers).
