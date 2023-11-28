import React from "react";
import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";

import { Capacitor } from "@capacitor/core";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { NavigationProgress, nprogress } from "@mantine/nprogress";
import { SafeArea } from "capacitor-plugin-safe-area";

import AppLayout from "./AppLayout";
import { GoalPage } from "./Goal/GoalPage";
import { GoalsPage } from "./Goals/GoalsPage";
import { HomePage } from "./Home/page";
import { goalsApi } from "./api";

import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/nprogress/styles.css";

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
    lastFrameTime = now;
  }, 50);

  return () => {
    clearInterval(intervalHandle);
    nprogress.complete();
  };
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    async loader() {
      // Only display marketing pages on web version
      if (Capacitor.getPlatform() !== "web") {
        return redirect("/goals");
      }
      return null;
    },
  },
  {
    path: "/goals",
    element: <AppLayout />,
    children: [
      {
        path: "/goals/:goalId",
        element: <GoalPage />,
        async loader({ params }) {
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
        },
      },
      {
        path: "/goals",
        element: <GoalsPage />,
        async loader() {
          const completeNavigationProgress = startNavigationProgress();
          const goals = await goalsApi.getGoals();
          const goalRecords = await Promise.all(
            goals.map((goal) =>
              (async () => ({
                goal,
                records: await goalsApi.getGoalRecords({ goalId: goal.id! }),
              }))()
            )
          ).then((r) =>
            r.reduce(
              (acc, cur) => ({
                ...acc,
                [cur.goal.id!]: cur.records,
              }),
              {}
            )
          );
          completeNavigationProgress();
          return [goals, goalRecords];
        },
      },
    ],
  },
]);

export default function App() {
  return (
    <React.StrictMode>
      <ColorSchemeScript />
      <MantineProvider
        defaultColorScheme="auto"
        theme={{ fontFamily: "'DM Sans', sans-serif" }}
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
