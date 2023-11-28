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
          p={action.p}
          variant={action.variant}
          onClick={() => onAction?.(action.id)}
          leftSection={action.leftIcon}
          rightSection={action.rightIcon}
        >
          {action.content}
        </Button>
      );
    case "icon-group":
      return (
        <ActionIcon.Group>
          {action.items.map((item) => (
            <ActionIcon
              key={item.id}
              variant={item.variant}
              size={item.size}
              aria-label={item.ariaLabel}
              onClick={() => onAction?.(item.id)}
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
        layout="alt"
        header={{ height: 60 }}
        navbar={{
          width: 230,
          breakpoint: em(750),
          collapsed: {
            mobile: true,
            desktop: false,
          },
        }}
        padding="md"
      >
        <AppShell.Header top={isMobile ? "var(--inset-top)" : undefined}>
          <Flex h="100%" px="md" align="center" justify="space-between">
            <Actions action={leadingAction} onAction={onAction} />
            {title}
            <Actions action={trailingAction} onAction={onAction} />
          </Flex>
        </AppShell.Header>
        <AppShell.Navbar
          p="md"
          top={!isMobile ? "var(--inset-top)" : undefined}
          bg="rgba(0, 0, 0, 0)"
        >
          <Stack gap="xs">
            {navigationItems.map((item) => (
              <Flex
                key={item.to}
                align="center"
                p={6}
                className={styles.desktopNavigationItem}
              >
                <Flex pr="sm">{item.icon}</Flex>
                {item.label}
              </Flex>
            ))}
          </Stack>
        </AppShell.Navbar>
        <AppShell.Main
          style={{ scrollPaddingTop: 100 }}
          pt="calc(var(--app-shell-header-offset, 0px) + var(--inset-top) + var(--app-shell-padding))"
          pb="calc(var(--app-shell-header-height) + var(--inset-bottom) + var(--app-shell-padding))"
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
