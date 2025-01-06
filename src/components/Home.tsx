import { Container, Stack, Button, TextInput } from "@mantine/core";
import { useState } from "react";
import { useAccount } from "wagmi";
import Header from "./Header";
import { writeContract } from "wagmi/actions";
import type { Hex } from "viem";
import { config } from "../wagmi";

import abi from "../abi";
import Register from "./MainFrens";

// https://block-explorer.testnet.lens.dev/address/0x4D9058C198c1c9433612F6dA4f271Ee7D7eB0459#contract
export const CONTRACT_ADDRESS = "0x4D9058C198c1c9433612F6dA4f271Ee7D7eB0459";

const Home = () => {
  const { isConnected } = useAccount();

  return (
    <Container p="sm" h="100vh">
      <Header />

      <Container size="sm">{isConnected && <Register />}</Container>
    </Container>
  );
};

export default Home;
