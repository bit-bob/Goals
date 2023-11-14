import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { SafeArea } from "capacitor-plugin-safe-area";
import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import { goalsApi } from "./api";
import AppLayout from "./AppLayout";
import { GoalPage } from "./Goal/GoalPage";
import { GoalsPage } from "./Goals/GoalsPage";

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
      <Route path="/:goalId" Component={GoalPage} />
      <Route
        path="/"
        loader={() => goalsApi.getGoals()}
        Component={GoalsPage}
      />
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
