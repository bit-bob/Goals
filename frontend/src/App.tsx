import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import { SafeArea } from "capacitor-plugin-safe-area";

import Goals from "./Goals";
import Goal from "./Goal";
import AppLayout from "./AppLayout";
import { goalsApi } from "./api";

import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";

SafeArea.getSafeAreaInsets().then(({ insets }) => {
  console.log(insets);
  let root = document.documentElement;
  root.style.setProperty("--inset-top", insets.top + "px");
});

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" Component={AppLayout}>
      <Route path="/:goalId" Component={Goal} />
      <Route path="/" loader={() => goalsApi.getGoals()} Component={Goals} />
    </Route>
  )
);

export default function App() {
  return (
    <React.StrictMode>
      <ColorSchemeScript />
      <MantineProvider defaultColorScheme="auto">
        <RouterProvider router={router} />
      </MantineProvider>
    </React.StrictMode>
  );
}
