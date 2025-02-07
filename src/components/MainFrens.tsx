import { Button, Stack } from "@mantine/core";
import { useEffect, useState, FC } from "react";
import { useAccount } from "wagmi";
import abi from "../abi";
import { readContract } from "wagmi/actions";
import { config } from "../wagmi";
import { signMessage, writeContract } from "wagmi/actions";
import { hashMessage, recoverPublicKey } from "viem";
import MakeFrens from "./MakeFrens";
import CheckFrenship from "./CheckFrenship";

// https://block-explorer.testnet.lens.dev/address/0x4D9058C198c1c9433612F6dA4f271Ee7D7eB0459#contract
export const CONTRACT_ADDRESS = "0x4D9058C198c1c9433612F6dA4f271Ee7D7eB0459";

// can be anything arbitrary
const MESSAGE_TO_SIGN = "i-wanna-make-frens";

const MainFrens: FC = () => {
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
        <CheckFrenship />
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
