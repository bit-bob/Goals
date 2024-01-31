import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { NavigationProgress } from "@mantine/nprogress";
import { SafeArea } from "capacitor-plugin-safe-area";

import { urls } from "./urls";

import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/nprogress/styles.css";
import { theme } from "./theme";

SafeArea.getSafeAreaInsets().then(({ insets }) => {
  document.documentElement.style.setProperty("--inset-top", insets.top + "px");
  document.documentElement.style.setProperty(
    "--inset-bottom",
    insets.bottom + "px"
  );
});

const router = createBrowserRouter(urls);

export default function App() {
  return (
    <React.StrictMode>
      <ColorSchemeScript />
      <MantineProvider
        defaultColorScheme="auto"
        theme={theme}
      >
        {/* @ts-expect-error - style prop is supported by <NavigationProgress />, but types are incorrect */}
        <NavigationProgress style={{ top: "var(--inset-top)" }} />
        <div
          style={{
            backgroundColor: "var(--mantine-color-body)",
            height: "var(--inset-top)",
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 99999,
          }}
        />
        <div
          style={{
            backgroundColor: "var(--mantine-color-body)",
            height: "var(--inset-bottom)",
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 99999,
          }}
        />
        <Notifications />
        <RouterProvider router={router} />
      </MantineProvider>
    </React.StrictMode>
  );
}
