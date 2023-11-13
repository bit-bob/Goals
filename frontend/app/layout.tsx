// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
"use client";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";

import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import { SafeArea } from "capacitor-plugin-safe-area";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    SafeArea.getSafeAreaInsets().then(({ insets }) => {
      console.log(insets);
      let root = document.documentElement;
      root.style.setProperty("--inset-top", insets.top + "px");
    });
  });

  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <meta
          name="viewport"
          content="viewport-fit=cover, width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider defaultColorScheme="auto">{children}</MantineProvider>
      </body>
    </html>
  );
}
