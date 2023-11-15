import React, { ReactNode, createContext, useState } from "react";
import {
  ActionIcon,
  ActionIconVariant,
  AppShell,
  Button,
  ButtonVariant,
  Flex,
  MantineSize,
} from "@mantine/core";
import { Outlet } from "react-router-dom";
import { TabBar } from "./components/TabBar";

interface NoAction {
  type: "none";
}
interface ButtonAction {
  type: "button";
  id: string;
  variant: ButtonVariant;
  content: ReactNode;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

interface IconGroup {
  type: "icon-group";
  items: Array<{
    id: string;
    variant: ActionIconVariant;
    ariaLabel: string;
    size: MantineSize;
    icon: ReactNode;
  }>;
}

type Action = NoAction | ButtonAction | IconGroup;

interface AppControls {
  setTitle: (title: string) => void;
  setLeadingAction: (action: Action) => void;
  setTrailingAction: (action: Action) => void;
  onAction: (listener: (actionId: string) => void) => void;
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
  return (
    <AppControlContext.Provider
      value={{
        setTitle,
        setLeadingAction,
        setTrailingAction,
        onAction: (v) => setOnAction(() => v),
      }}
    >
      <AppShell header={{ height: 60 }} padding="md">
        <AppShell.Header top="var(--inset-top)">
          <Flex h="100%" px="md" align="center" justify="space-between">
            <Actions action={leadingAction} onAction={onAction} />
            {title}
            <Actions action={trailingAction} onAction={onAction} />
          </Flex>
        </AppShell.Header>
        <AppShell.Main
          style={{ scrollPaddingTop: 100 }}
          pt="calc(var(--app-shell-header-offset, 0px) + var(--inset-top) + var(--app-shell-padding))"
          pb="calc(var(--app-shell-header-height) + var(--inset-bottom) + var(--app-shell-padding))"
        >
          <Outlet />
        </AppShell.Main>

        <TabBar />
      </AppShell>
    </AppControlContext.Provider>
  );
}
