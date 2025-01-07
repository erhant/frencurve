import { Button, TextInput, Title } from "@mantine/core";
import { useState, FC } from "react";
import { useAccount } from "wagmi";
import abi from "../abi";
import { CONTRACT_ADDRESS } from "./MainFrens";
import { config } from "../wagmi";
import { writeContract } from "wagmi/actions";
import type { Hex } from "viem";

const MakeFrens: FC = () => {
  const { address } = useAccount();
  const [friendAddress, setFriendAddress] = useState<Hex>();

  const handleMakeFrens = () => {
    if (!address || !friendAddress) return;
    writeContract(config, {
      abi,
      address: CONTRACT_ADDRESS,
      functionName: "makeFrens",
      args: [address, friendAddress],
    });
  };

  return (
    <>
      <Title order={2}>Make Frens</Title>
      <TextInput
        withAsterisk
        label="Enter friend's address"
        placeholder="0x0000Bb8c7B69d6c1a8D6A58A3c3B1757A37C08ce" // make me ur fren <3
        value={friendAddress}
        onChange={(e) => setFriendAddress(e.currentTarget.value as Hex)}
        style={{ width: "100%" }}
      />
      <Button size="lg" onClick={handleMakeFrens} disabled={!friendAddress}>
        Make Frens
      </Button>
    </>
  );
};

export default MakeFrens;
