import { Button, Text, TextInput, Title } from "@mantine/core";
import { useState, FC } from "react";
import { useAccount } from "wagmi";
import abi from "../abi";
import { CONTRACT_ADDRESS } from "./MainFrens";
import { readContract } from "wagmi/actions";
import { config } from "../wagmi";
import type { Hex } from "viem";

enum Frenship {
  None,
  Frens,
  NotFrens,
}

const CheckFrenship: FC = () => {
  const { address } = useAccount();
  const [friendAddress, setFriendAddress] = useState<Hex>();
  const [frenshipStatus, setFrenshipStatus] = useState<Frenship>();

  const handleMakeFrens = () => {
    if (!address || !friendAddress) return;
    readContract(config, {
      abi,
      address: CONTRACT_ADDRESS,
      functionName: "frenships",
      args: [address, friendAddress],
    }).then((status) => {
      setFrenshipStatus(
        status == 0
          ? Frenship.None
          : status == 1
            ? Frenship.Frens
            : Frenship.NotFrens
      );
    });
  };

  return (
    <>
      <Title order={2}>Checks Frenships</Title>
      <TextInput
        withAsterisk
        label="Enter friend's address"
        placeholder="0x0000Bb8c7B69d6c1a8D6A58A3c3B1757A37C08ce" // make me ur fren <3
        value={friendAddress}
        onChange={(e) => setFriendAddress(e.currentTarget.value as Hex)}
        style={{ width: "100%" }}
      />
      <Text>
        {frenshipStatus === Frenship.Frens
          ? "You are frens forever!"
          : frenshipStatus === Frenship.NotFrens
            ? "You are not frens..."
            : "You have not yet tried to be frens :("}
      </Text>
      <Button size="lg" onClick={handleMakeFrens} disabled={!friendAddress}>
        Check Frenship
      </Button>
    </>
  );
};

export default CheckFrenship;
