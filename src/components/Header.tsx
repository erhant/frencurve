import { Group, Stack, Text, Title } from "@mantine/core";
import { ConnectKitButton } from "connectkit";

const Header = (): JSX.Element => {
  return (
    <Group p="xs">
      <Stack gap="xs">
        <Title order={1}>Make Frens</Title>
        <Text>Time to put your frenships on-chain on curves!</Text>
      </Stack>

      <span style={{ flexGrow: 1 }} />
      <ConnectKitButton showBalance mode="light" />
    </Group>
  );
};

export default Header;
