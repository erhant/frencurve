import { Web3Provider } from "./Web3Provider";
import { ConnectKitButton } from "connectkit";

import { useAccount } from "wagmi";

// Make sure that this component is wrapped with ConnectKitProvider
const MyComponent = (): JSX.Element => {
  const { address, isConnecting, isDisconnected } = useAccount();
  if (isConnecting) return <div>Connecting...</div>;
  if (isDisconnected) return <div>Disconnected</div>;
  return <div>Connected Wallet: {address}</div>;
};

const App = () => {
  return (
    <Web3Provider>
      <ConnectKitButton />
      <MyComponent />
    </Web3Provider>
  );
};

export default App;
