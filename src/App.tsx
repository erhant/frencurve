import { Web3Provider } from "./Web3Provider";
import { ConnectKitButton } from "connectkit";
import { hashMessage, recoverAddress, recoverPublicKey } from "viem";
import { useAccount } from "wagmi";
import { signMessage, writeContract } from "wagmi/actions";
import { config } from "./wagmi";
import abi from "./abi";
import { useState } from "react";

// https://block-explorer.testnet.lens.dev/address/0x4D9058C198c1c9433612F6dA4f271Ee7D7eB0459#contract
const CONTRACT_ADDRESS = "0x4D9058C198c1c9433612F6dA4f271Ee7D7eB0459";

// Make sure that this component is wrapped with ConnectKitProvider
const MyComponent = (): JSX.Element => {
  const { address, isConnecting, isDisconnected, chain } = useAccount();
  if (isConnecting) return <div>Connecting...</div>;
  if (isDisconnected) return <div>Disconnected</div>;
  return (
    <div>
      Connected Wallet: {address} and chain: {chain?.name}
    </div>
  );
};

// Make sure that this component is wrapped with ConnectKitProvider
const FrenHandler = (): JSX.Element => {
  const [publicKey, setPublicKey] = useState<{ x: bigint; y: bigint }>();

  return (
    <div>
      <button
        onClick={() => {
          signMessage(config, {
            message: "i-wanna-make-frens",
          }).then((signature) => {
            console.log({ signature });
            const hash = hashMessage("i-wanna-make-frens");
            recoverPublicKey({
              hash,
              signature,
            }).then((pubKey) => {
              const [x, y] = [pubKey.slice(4, 68), pubKey.slice(68, 132)];
              setPublicKey({ x: BigInt(`0x${x}`), y: BigInt(`0x${y}`) });
            });
          });
        }}
      >
        Click me
      </button>
      {publicKey && (
        <button
          onClick={() =>
            writeContract(config, {
              abi,
              address: CONTRACT_ADDRESS,
              functionName: "register",
              args: [publicKey],
            })
          }
        >
          Register
        </button>
      )}
    </div>
  );
};

const App = () => {
  return (
    <Web3Provider>
      <ConnectKitButton showBalance />
      <MyComponent />
      <FrenHandler />
    </Web3Provider>
  );
};

export default App;
