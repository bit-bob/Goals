import React from "react";

import { Flex } from "@mantine/core";

import { NavigationItem } from "../AppLayout";

export interface TabBarProps {
  items: NavigationItem[];
}

export function TabBar({ items }: TabBarProps) {
  return (
    <Flex
      style={{
        position: "fixed",
        bottom: "var(--inset-bottom)",
        borderTop:
          "calc(0.0625rem*var(--mantine-scale)) solid var(--mantine-color-dark-4)",
      }}
      align="center"
      bg="var(--mantine-color-body)"
      h="var(--app-shell-header-height)"
      justify="space-around"
      w="100%"
    >
      {items.map((item) => (
        <Flex direction="column" key={item.to}>
          {item.icon}
        </Flex>
      ))}
    </Flex>
  );
}
