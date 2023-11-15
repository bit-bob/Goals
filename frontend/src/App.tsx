import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { NavigationProgress, nprogress } from "@mantine/nprogress";
import { SafeArea } from "capacitor-plugin-safe-area";
import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  defer,
  Route,
  RouterProvider,
} from "react-router-dom";

import { goalsApi } from "./api";
import AppLayout from "./AppLayout";
import { GoalPage } from "./Goal/GoalPage";
import { GoalsPage } from "./Goals/GoalsPage";

import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/nprogress/styles.css";
import { TabBar } from "./components/TabBar";

SafeArea.getSafeAreaInsets().then(({ insets }) => {
  document.documentElement.style.setProperty("--inset-top", insets.top + "px");
  document.documentElement.style.setProperty(
    "--inset-bottom",
    insets.bottom + "px"
  );
});

function startNavigationProgress(
  maxProgress: number = 90,
  easing: number = 200
) {
  nprogress.reset();
  let lastFrameTime = Date.now();
  let elapsedTime = 0;

  const intervalHandle = setInterval(() => {
    nprogress.set((elapsedTime / (elapsedTime + easing)) * maxProgress);
    const now = Date.now();
    elapsedTime += now - lastFrameTime;
    console.log(elapsedTime);
    lastFrameTime = now;
  }, 50);

  return () => {
    clearInterval(intervalHandle);
    nprogress.complete();
  };
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" Component={AppLayout}>
      <Route
        path="/:goalId"
        loader={async ({ params }) => {
          const completeNavigationProgress = startNavigationProgress();
          const goal = await goalsApi.getGoal({ goalId: params.goalId! });
          completeNavigationProgress();
          return {
            goal,
            progress: goalsApi.getGoalProgress({
              goalId: goal.id!,
              intervalStartDate: new Date(),
            }),
            records: goalsApi.getGoalRecords({ goalId: goal.id! }),
          };
        }}
        Component={GoalPage}
      />
      <Route
        path="/"
        loader={async () => {
          const completeNavigationProgress = startNavigationProgress();
          const goals = await goalsApi.getGoals();
          completeNavigationProgress();
          return goals;
        }}
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
        {/* @ts-ignore */}
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
