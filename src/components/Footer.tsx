import { Group, Text } from "@mantine/core";
import type { FC } from "react";

const Footer: FC = () => {
  return (
    <Group gap="xs" mt="lg" align="flex-end" justify="center">
      <Text
        component="a"
        href="https://jokerace.io/contest/polygon/0x552bdf3d0acfa0bc398607fd675d3b4cce6aabdf/submission/70592271744613817044400087847213095324107207545920898777206167711444430925570"
        target="_blank"
      >
        Jokerace
      </Text>
      <Text
        component="a"
        href="https://github.com/erhant/frencurve"
        target="_blank"
      >
        GitHub
      </Text>
    </Group>
  );
};

export default Footer;
