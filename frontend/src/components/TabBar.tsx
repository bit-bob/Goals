import { Avatar, Box, Flex } from "@mantine/core";
import { IconBolt, IconTargetArrow } from "@tabler/icons-react";
import React from "react";

export function TabBar() {
  return (
    <Flex
      w="100%"
      bg="var(--mantine-color-body)"
      h="var(--app-shell-header-height)"
      align="center"
      justify="space-around"
      style={{
        position: "fixed",
        bottom: "var(--inset-bottom)",
        borderTop:
          "calc(0.0625rem*var(--mantine-scale)) solid var(--mantine-color-dark-4)",
      }}
    >
      <IconTargetArrow />
      <IconBolt />
      <Avatar color="blue" radius="xl">
        LH
      </Avatar>
    </Flex>
  );
}
