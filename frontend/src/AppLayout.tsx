import React, { ReactNode, createContext, useState } from "react";
import { Outlet } from "react-router-dom";

import {
  ActionIcon,
  ActionIconVariant,
  AppShell,
  Avatar,
  Button,
  ButtonVariant,
  Flex,
  MantineSize,
  MantineStyleProps,
  Stack,
  em,
} from "@mantine/core";
import { IconBolt, IconTargetArrow } from "@tabler/icons-react";

import { TabBar } from "./components/TabBar";
import { useMobileBreakpoint } from "./useMobileBreakpoint";

import styles from "./AppLayout.module.css";

interface NoAction {
  type: "none";
}
interface ButtonAction {
  content: ReactNode;
  id: string;
  leftIcon?: ReactNode;
  p?: MantineStyleProps["p"];
  rightIcon?: ReactNode;
  type: "button";
  variant: ButtonVariant;
}

interface IconGroup {
  items: Array<{
    id: string;
    variant: ActionIconVariant;
    ariaLabel: string;
    size: MantineSize;
    icon: ReactNode;
  }>;
  type: "icon-group";
}

type Action = NoAction | ButtonAction | IconGroup;

export interface NavigationItem {
  icon: ReactNode;
  label: string;
  to: string;
}

interface AppControls {
  onAction: (listener: (actionId: string) => void) => void;
  setLeadingAction: (action: Action) => void;
  setTitle: (title: string) => void;
  setTrailingAction: (action: Action) => void;
}

export const AppControlContext = createContext<AppControls>({
  setTitle() {},
  setLeadingAction() {},
  setTrailingAction() {},
  onAction() {},
});

interface ActionsProps {
  action?: Action;
  onAction?: (actionId: string) => void;
}

function Actions({ action, onAction }: ActionsProps) {
  if (!action) {
    return <div />;
  }
  switch (action.type) {
    case "button":
      return (
        <Button
          className={styles.noDrag}
          leftSection={action.leftIcon}
          onClick={() => onAction?.(action.id)}
          p={action.p}
          rightSection={action.rightIcon}
          variant={action.variant}
        >
          {action.content}
        </Button>
      );
    case "icon-group":
      return (
        <ActionIcon.Group>
          {action.items.map((item) => (
            <ActionIcon
              className={styles.noDrag}
              aria-label={item.ariaLabel}
              key={item.id}
              onClick={() => onAction?.(item.id)}
              size={item.size}
              variant={item.variant}
            >
              {item.icon}
            </ActionIcon>
          ))}
        </ActionIcon.Group>
      );
    default:
      return <div />;
  }
}

export default function AppLayout() {
  const [title, setTitle] = useState<string>();
  const [leadingAction, setLeadingAction] = useState<Action>();
  const [trailingAction, setTrailingAction] = useState<Action>();
  const [onAction, setOnAction] = useState<(action: string) => void>();
  const isMobile = useMobileBreakpoint();
  const navigationItems: NavigationItem[] = [
    {
      to: "/",
      label: "Goals",
      icon: <IconTargetArrow />,
    },
    {
      to: "/automations",
      label: "Automations",
      icon: <IconBolt />,
    },
  ];
  const userNavigationItem: NavigationItem = {
    to: "/profile",
    label: "Profile",
    icon: (
      <Avatar color="blue" radius="xl">
        LH
      </Avatar>
    ),
  };
  return (
    <AppControlContext.Provider
      value={{
        setTitle,
        setLeadingAction,
        setTrailingAction,
        onAction: (v) => setOnAction(() => v),
      }}
    >
      <AppShell
        navbar={{
          width: 230,
          breakpoint: em(750),
          collapsed: {
            mobile: true,
            desktop: false,
          },
        }}
        header={{ height: 60 }}
        layout="alt"
        padding="md"
      >
        <AppShell.Header
          top={isMobile ? "var(--inset-top)" : undefined}
          className={styles.drag}
        >
          <Flex align="center" h="100%" justify="space-between" px="md">
            <Actions action={leadingAction} onAction={onAction} />
            {title}
            <Actions action={trailingAction} onAction={onAction} />
          </Flex>
        </AppShell.Header>
        <AppShell.Navbar
          bg="rgba(0, 0, 0, 0)"
          p="md"
          top={
            !isMobile
              ? "calc(var(--inset-top) + var(--app-shell-header-offset, 0px))"
              : undefined
          }
        >
          <Stack gap="xs">
            {navigationItems.map((item) => (
              <Flex
                align="center"
                className={styles.desktopNavigationItem}
                key={item.to}
                p={6}
              >
                <Flex pr="sm">{item.icon}</Flex>
                {item.label}
              </Flex>
            ))}
          </Stack>
        </AppShell.Navbar>
        {/**
         *
         */}
        <AppShell.Main
          pb="calc(var(--app-shell-header-height) + var(--inset-bottom) + var(--app-shell-padding))"
          pt="calc(var(--app-shell-header-offset, 0px) + var(--inset-top) + var(--app-shell-padding))"
          ml="var(--app-shell-navbar-offset, 0px)"
          pl="var(--app-shell-padding)"
          bg="var(--mantine-color-body)"
          style={{ scrollPaddingTop: 100 }}
        >
          <Outlet />
        </AppShell.Main>
        {isMobile && (
          <TabBar items={[...navigationItems, userNavigationItem]} />
        )}
      </AppShell>
    </AppControlContext.Provider>
  );
}
