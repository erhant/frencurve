import { expect } from "chai";
import * as hre from "hardhat";
import { type Contract, type Wallet } from "zksync-ethers";
import { getWallet, LOCAL_RICH_WALLETS, deployContract } from "../deploy/utils";
import { parseEther } from "ethers";
import { privateKeyToAccount } from "viem/accounts";
import { Hex } from "viem";

describe("FrenCurve", function () {
  const owner = getWallet(LOCAL_RICH_WALLETS[0].privateKey);
  const alice = getWallet(LOCAL_RICH_WALLETS[1].privateKey);
  const bob = getWallet(LOCAL_RICH_WALLETS[2].privateKey);

  let frencurve: Contract;

  before(async function () {
    frencurve = await deployContract("FrenCurve", [], {
      wallet: owner,
      // silent: true,
    });
  });

  it("should be deployed correctly", async function () {
    expect(await frencurve.getAddress()).to.be.properAddress;
    expect(await frencurve.FRENSHIP_THRESHOLD()).to.eq(parseEther("1"));
  });

  it("should register", async function () {
    const pubKey = privateKeyToAccount(alice.privateKey as Hex).publicKey.slice(4); // skip 0x and prefix
    const [x, y] = [pubKey.slice(0, 64), pubKey.slice(64, 128)];
    await (frencurve.connect(alice) as Contract).register({ x: `0x${x}`, y: `0x${y}` });
  });
});
