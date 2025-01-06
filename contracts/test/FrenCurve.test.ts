import { expect } from "chai";
import * as hre from "hardhat";
import { type Contract, type Wallet } from "zksync-ethers";
import { getWallet, LOCAL_RICH_WALLETS, deployContract } from "../deploy/utils";
import { parseEther, randomBytes } from "ethers";
import { privateKeyToAccount } from "viem/accounts";
import { Hex } from "viem";

describe("FrenCurve", function () {
  const owner = getWallet(LOCAL_RICH_WALLETS[0].privateKey);
  const wallets = LOCAL_RICH_WALLETS.slice(1).map((w) => getWallet(w.privateKey));

  let frencurve: Contract;
  const frenships = [0, 0]; // [0]: fren, [1]: not fren

  before(async function () {
    frencurve = await deployContract("FrenCurve", [], {
      wallet: owner,
      // silent: true,
    });
  });

  it("should be deployed correctly", async function () {
    expect(await frencurve.getAddress()).to.be.properAddress;
    expect(await frencurve.FRENSHIP_THRESHOLD()).to.eq(
      "57896044618658097711785492504343953926634992332820282019728792003956564819967" // type(uint256).max >> 1;
    );
  });

  it("should register alice and bob", async function () {
    for (const wallet of wallets) {
      const pubKey = privateKeyToAccount(wallet.privateKey as Hex).publicKey.slice(4); // skip 0x and "04" prefix
      const [x, y] = [pubKey.slice(0, 64), pubKey.slice(64, 128)];
      await (frencurve.connect(wallet) as Contract).register({ x: `0x${x}`, y: `0x${y}` });
    }
  });

  it("should make alice and bob frens", async function () {
    // pair-wise frenship
    for (let i = 0; i < wallets.length; i++) {
      for (let j = i + 1; j < wallets.length; j++) {
        const [alice, bob] = [wallets[i], wallets[j]];
        expect(await frencurve.frenships(alice.address, bob.address)).to.eq(0);
        expect(await frencurve.frenships(bob.address, alice.address)).to.eq(0);

        await frencurve.makeFrens(alice.address, bob.address);

        const newFrenship = await frencurve.frenships(alice.address, bob.address);
        expect(await frencurve.frenships(bob.address, alice.address)).to.eq(newFrenship);
        expect(newFrenship).to.not.eq(0);

        frenships[Number(newFrenship) - 1]++;
      }
    }

    // we expect some of both frenships and non-frenships
    console.log(frenships);
    expect(frenships[0]).to.be.greaterThan(0);
    expect(frenships[1]).to.be.greaterThan(0);
  });
});
