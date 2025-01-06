import { Container } from "@mantine/core";

import Fren from "./Fren";
import Wallet from "./Wallet";

const Home = () => {
  return (
    <Container>
      <Wallet />
      <Fren />
    </Container>
  );
};

export default Home;
