import React from "react";
import { ReactNode } from "react";

import { Drawer, Modal } from "@mantine/core";

import { useMobileBreakpoint } from "../useMobileBreakpoint";

interface ResponsiveModalProps {
  children: ReactNode;
  onClose: () => void;
  opened: boolean;
  title: string;
}

export function ResponsiveModal({
  opened,
  onClose,
  title,
  children,
}: ResponsiveModalProps) {
  const isMobile = useMobileBreakpoint();

  return isMobile ? (
    <Drawer
      onClose={onClose}
      opened={opened}
      overlayProps={{ backgroundOpacity: 0.5 }}
      position="bottom"
      size="85%"
      title={title}
    >
      {children}
    </Drawer>
  ) : (
    <Modal onClose={onClose} opened={opened} title={title} centered>
      {children}
    </Modal>
  );
}
