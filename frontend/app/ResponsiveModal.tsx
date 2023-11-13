import { Drawer, Modal, em } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { ReactNode } from "react";

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
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);

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
