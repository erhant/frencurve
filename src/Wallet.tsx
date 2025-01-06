import { useAccount } from "wagmi";

const WalletStatus = (): JSX.Element => {
  const { address, isConnecting, isDisconnected, chain } = useAccount();
  let status = (
    <div>
      Connected Wallet: {address} and chain: {chain?.name}
    </div>
  );
  if (isConnecting) status = <div>Connecting...</div>;
  if (isDisconnected) status = <div>Disconnected</div>;

  return <div>{status}</div>;
};

export default WalletStatus;
