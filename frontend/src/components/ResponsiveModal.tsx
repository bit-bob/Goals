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
      size="85%"
      title={title}
      opened={opened}
      onClose={onClose}
      position="bottom"
      overlayProps={{ backgroundOpacity: 0.5 }}
    >
      {children}
    </Drawer>
  ) : (
    <Modal opened={opened} onClose={onClose} title={title} centered>
      {children}
    </Modal>
  );
}
