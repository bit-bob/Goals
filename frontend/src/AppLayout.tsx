import React from "react";
import { AppShell, Flex } from "@mantine/core";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header top="var(--inset-top)">
        <Flex h="100%" px="md" align="center" justify="space-between">
          Goals
        </Flex>
      </AppShell.Header>
      <AppShell.Main pt="calc(var(--app-shell-header-offset, 0px) + var(--inset-top) + var(--app-shell-padding))">
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
