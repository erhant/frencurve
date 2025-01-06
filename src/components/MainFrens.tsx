import { Button, Stack } from "@mantine/core";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import abi from "../abi";
import { CONTRACT_ADDRESS } from "./Home";
import { readContract } from "wagmi/actions";
import { config } from "../wagmi";
import { signMessage, writeContract } from "wagmi/actions";
import { hashMessage, Hex, recoverPublicKey } from "viem";
import MakeFrens from "./MakeFrens";
import CheckFrens from "./CheckFrens";

const MESSAGE_TO_SIGN = "i-wanna-make-frens";

const MainFrens = () => {
  const { address } = useAccount();
  const [isRegistered, setIsRegistered] = useState(false);

  const handleRegister = async () => {
    const signature = await signMessage(config, { message: MESSAGE_TO_SIGN });
    const hash = hashMessage(MESSAGE_TO_SIGN);
    const pubKey = await recoverPublicKey({ hash, signature });

    // slice while skipping `0x04` at the start
    const [x, y] = [pubKey.slice(4, 68), pubKey.slice(68, 132)];
    const pk = { x: BigInt(`0x${x}`), y: BigInt(`0x${y}`) };

    // call register function
    writeContract(config, {
      abi,
      address: CONTRACT_ADDRESS,
      functionName: "register",
      args: [pk],
    }).then(() => {
      setIsRegistered(true);
    });
  };

  // check user registration
  useEffect(() => {
    if (!address) return;
    readContract(config, {
      address: CONTRACT_ADDRESS,
      abi,
      functionName: "publicKeys",
      args: [address],
    }).then(([_, y]) => {
      setIsRegistered(y !== 0n);
    });
  }, [address]);

  if (isRegistered) {
    return (
      <Stack gap="xl" align="center" mt={100}>
        <MakeFrens />
        <CheckFrens />
      </Stack>
    );
  } else {
    return (
      <Button size="lg" onClick={handleRegister}>
        Register
      </Button>
    );
  }
};

export default MainFrens;
