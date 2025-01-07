# Frencurve Contract

See [LEGACY](./LEGACY.md) for the legacy README.

<!-- deployed at: 0x4D9058C198c1c9433612F6dA4f271Ee7D7eB0459 -->

## Installation

Install dependencies:

```bash
yarn install
```

Create a `.env` file copying the `.env.example` file:

```bash
cp .env.example .env
```

Update the `.env` file with the correct values.

## Usage

```bash
yarn compile
yarn clean
yarn lint
```

## Testing

Run tests on the Hardhat Network powered by a [ZKsync In-memory Node](https://docs.zksync.io/build/test-and-debug/in-memory-node).

```bash
yarn test

# or run a specific test
yarn test ./test/Frencurve.test.ts

# run test on lensTestnet
yarn test --network lensTestnet
```

We support the following networks:

- `lensTestnet`: Lens Development Network (37111).
- `hardhat`: runs on a ZKsync [In-Memory Node](https://docs.zksync.io/build/test-and-debug/in-memory-node) for testing.

> [!TIP]
>
> zkSync In-memory Node currently supports only the L2 node. If contracts also need L1, use another testing environment like [Dockerized Node](https://docs.zksync.io/build/test-and-debug/dockerized-l1-l2-nodes).

### Deploy <!-- omit in toc -->

```bash
yarn deploy --script <deploy-script.ts> --network <network-name>
```

For example:

```bash
yarn deploy --script deploy-token.ts --network lensTestnet
```
