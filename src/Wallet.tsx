import { ConnectKitButton } from "connectkit";
import { useAccount } from "wagmi";

const Wallet = (): JSX.Element => {
  const { address, isConnecting, isDisconnected, chain } = useAccount();
  let status = (
    <div>
      Connected Wallet: {address} and chain: {chain?.name}
    </div>
  );
  if (isConnecting) status = <div>Connecting...</div>;
  if (isDisconnected) status = <div>Disconnected</div>;

  return (
    <div>
      <ConnectKitButton showBalance />
      {status}
    </div>
  );
};

export default Wallet;
