import { Container, Stack, Button, TextInput } from "@mantine/core";
import { useState } from "react";
import { useAccount } from "wagmi";
import Header from "./Header";
import { signMessage, writeContract } from "wagmi/actions";
import { hashMessage, Hex, recoverPublicKey } from "viem";
import { config } from "../wagmi";

import abi from "../abi";

const CONTRACT_ADDRESS = "0x4D9058C198c1c9433612F6dA4f271Ee7D7eB0459";
const MESSAGE_TO_SIGN = "i-wanna-make-frens";
const Home = () => {
  const { address, isConnecting, isDisconnected } = useAccount();
  const [publicKey, setPublicKey] = useState<{ x: bigint; y: bigint }>();
  const [friendAddress, setFriendAddress] = useState<Hex>("0x");

  const handleSignature = async () => {
    const signature = await signMessage(config, { message: MESSAGE_TO_SIGN });
    const hash = hashMessage(MESSAGE_TO_SIGN);
    const pubKey = await recoverPublicKey({ hash, signature });

    // slice while skipping `0x04` at the start
    const [x, y] = [pubKey.slice(4, 68), pubKey.slice(68, 132)];

    setPublicKey({ x: BigInt(`0x${x}`), y: BigInt(`0x${y}`) });
  };

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
    <Container p="sm" h="100vh">
      <Header />

      <Container size="sm">
        <Stack gap="xl" align="center" mt={100}>
          <Button size="lg" onClick={handleSignature}>
            Register
          </Button>

          {publicKey && (
            <>
              <TextInput
                placeholder="Enter friend's address"
                value={friendAddress}
                onChange={(e) => setFriendAddress(e.currentTarget.value as Hex)}
                style={{ width: "100%" }}
              />
              <Button
                size="lg"
                onClick={handleMakeFrens}
                disabled={!friendAddress}
              >
                Make Frens
              </Button>
            </>
          )}
        </Stack>
      </Container>
    </Container>
  );
};

export default Home;
