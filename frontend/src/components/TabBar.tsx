import { Flex } from "@mantine/core";
import React from "react";
import { NavigationItem } from "../AppLayout";

export interface TabBarProps {
  items: NavigationItem[];
}

export function TabBar({ items }: TabBarProps) {
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
      {items.map((item) => (
        <Flex key={item.to} direction="column">
          {item.icon}
        </Flex>
      ))}
    </Flex>
  );
}
