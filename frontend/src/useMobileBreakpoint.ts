import { em } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

export function useMobileBreakpoint() {
  return useMediaQuery(`(max-width: ${em(750)})`);
}
