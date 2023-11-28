import React from "react";
import { RouteObject, redirect } from "react-router-dom";

import { Capacitor } from "@capacitor/core";
import { nprogress } from "@mantine/nprogress";

import AppLayout from "./AppLayout";
import { GoalPage } from "./Goal/GoalPage";
import { GoalsPage } from "./Goals/GoalsPage";
import { HomePage } from "./Home/page";
import { goalsApi } from "./api";

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

export const urls: RouteObject[] = [
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
];
