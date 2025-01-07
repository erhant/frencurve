# Frencurve

Built on [Lens Network](https://dev-preview.lens.xyz/docs/network/overview) for [Lens Holiday Hackathon](https://www.lens.xyz/news/lens-holiday-hackathon) using [ConnectKit](https://github.com/family/connectkit) and [Hardhat](https://dev-preview.lens.xyz/docs/network/getting-started/hardhat).

![home](./img/Home.png)

## Curve Friendship

Every account in EVM has an address, derived from a public key, derived from a private key. Public key is simply a coordinate on an "[elliptic-curve](https://www.rareskills.io/post/elliptic-curves-finite-fields)", so basically it is a point $(x, y) \in \mathbb{F}_p^2$ for some large prime $p$ such that it satisfies the following curve equation of [`secp256k1`](https://en.bitcoin.it/wiki/Secp256k1):

$$
y^2 = x^3 + 7
$$

A curve-friendship for a pair of points $p, q$ some value threshold `t` is defined as a function $\text{Fren} : \mathbb{F}_p^2 \times \mathbb{F}_p^2 \to \{0, 1\}$ which is given below:

$$
\text{Fren}(p, q) =
\begin{cases}
  1 & \text{Dist}(p, q) < t \\
  0 & \text{Dist}(p, q) \geq t
\end{cases}
$$

and the distance function $\text{Dist}: \mathbb{F}_p \times \mathbb{F}_p \mapsto \{0, 1\}^{256}$ is defined as a generic distance function between two points on the curve over the respective field, such that the distance is mapped to a word in EVM. So now, you and your friends can register on-chain, and unlock new potential use-cases with your mathematically provable friendship!

## Contracts

Frencurve contract is deployed on [Lens Testnet](https://block-explorer.testnet.lens.dev/address/0x4D9058C198c1c9433612F6dA4f271Ee7D7eB0459#transactions). You can interact with it as follows:

- `register({x, y})` with the coordinates of your public key, using the corresponding wallet.
- `makeFrens(address, address)` with another address, permanently marking whether you are frens or not on chain!
- call `frenships(address, address)` to read frenships of addresses.

We also have a simple ERC20 implementation called `FrenERC20` as an example, that only allows token transfers among frens, and none other!

- [Contract on Testnet](https://block-explorer.testnet.lens.dev/address/0x4D9058C198c1c9433612F6dA4f271Ee7D7eB0459#contract)
- [Jokerace Entry](https://jokerace.io/contest/polygon/0x552bdf3d0acfa0bc398607fd675d3b4cce6aabdf/submission/70592271744613817044400087847213095324107207545920898777206167711444430925570)

## Usage

Install everything with:

```sh
pnpm install
```

Then run with:

```sh
pnpm run dev
```

The website should be live on <http://localhost:5173/>.

### Contracts

We are using the template, initialized with:

```sh
git clone --depth=1 --branch=master git@github.com:lens-protocol/lens-network-hardhat-boilerplate.git contracts

rm -rf ./contracts/.git
```

For this part, read the [README](./contracts/README.md) within the contracts folder.

<!-- This is a [Vite](https://vitejs.dev) project bootstrapped with [`create-wagmi`](https://github.com/wevm/wagmi/tree/main/packages/create-wagmi). -->

## Future Work

- In the current implementation, Frencurve has a single constant that value for friendship that more or less hits a %70 friendship and %30 non-friendship over random wallets. This threshold value can be adjusted per-app.

- We have used account public keys as identifiers as they can be used cross-chain as well. However, one can also consider ECDSA signatures as coordinates alone too, making app-specific friendships similar to the bulletpoint above.

- The distance function to be used has many issues with the integer overflows and safe-math operations, one can definitely come up with a better algorithm!
