import React from "react";
import { Drawer, Modal, em } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { ReactNode } from "react";
import { useMobileBreakpoint } from "../useMobileBreakpoint";

interface ResponsiveModalProps {
  opened: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
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
