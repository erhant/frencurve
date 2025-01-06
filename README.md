# Frencurve

Built on [Lens Network](https://dev-preview.lens.xyz/docs/network/overview) for [Lens Holiday Hackathon](https://www.lens.xyz/news/lens-holiday-hackathon) using [ConnectKit](https://github.com/family/connectkit) and [Hardhat](https://dev-preview.lens.xyz/docs/network/getting-started/hardhat).

## Curve Friendship

Every account in EVM has an address, derived from a public key, derived from a private key. Public key is simply a coordinate on an "[elliptic-curve](https://www.rareskills.io/post/elliptic-curves-finite-fields)", so basically it is a point $(x, y) \in \mathbb{F}_p^2$ for some large prime $p$ such that it satisfies the following curve equation of [`secp256k1`](https://en.bitcoin.it/wiki/Secp256k1):

$$
y^2 = x^3 + 7
$$

A curve-friendship for a pair of points $p, q$ some value threshold `t` is defined as a function $\text{Fren} : \mathbb{F}_p^2 \times \mathbb{F}_p^2 \to \{0, 1\}$ which is given below:

$$
\text{Fren}(p, q) =
\begin{cases}
  1 & \text{Dist}(p, q) \leq t \\
  0 & \text{Dist}(p, q) > t
\end{cases}
$$

and the distance function $\text{Dist}: \mathbb{F}_p \times \mathbb{F}_p \mapsto \{0, 1\}^{256}$ is defined as a generic distance function between two points on the curve over the respective field, such that the distance is mapped to a word in EVM.

<!--
```mermaid
quadrantChart
    title y^2 = x^3 + 3 (mod 23)
```
-->

So now, you and your friends can register on-chain, and unlock new potential use-cases with your mathematically provable friendship!

## Getting the Public Key

You can get the public key of a user from a transaction alone using Ethers with a snippet such as:

```ts
import { SigningKey, Transaction, computeAddress } from "ethers";

// ...

const receipt = await txToWait.wait();
if (receipt) {
  // recover & check public key
  const tx = await receipt.getTransaction();
  const signature = tx.signature;
  const digest = Transaction.from(tx).unsignedHash;
  const publicKey = SigningKey.recoverPublicKey(digest, signature);
  const compressedPublicKey = PublicKey.fromHex(publicKey).compressed;
  expect("0x" + compressedPublicKey.toString("hex")).to.equal(user.publicKey);

  // check address
  const addrRecovered = computeAddress(publicKey);
  expect(addrRecovered).to.equal(user.address);
}
```

## Installation

```sh
pnpm install
```

### Contracts

We are using the template, initialized with:

```sh
git clone --depth=1 --branch=master git@github.com:lens-protocol/lens-network-hardhat-boilerplate.git contracts && rm -rf ./contracts/.git
```

For this part, readh the [README](./contracts/README.md) within the contracts folder.

<!-- This is a [Vite](https://vitejs.dev) project bootstrapped with [`create-wagmi`](https://github.com/wevm/wagmi/tree/main/packages/create-wagmi). -->
