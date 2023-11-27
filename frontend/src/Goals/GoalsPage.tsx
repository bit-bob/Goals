import { Stack, rem } from "@mantine/core";
import { useDisclosure, useLocalStorage } from "@mantine/hooks";
import { IconColumns, IconLayoutGrid } from "@tabler/icons-react";
import React, { useContext, useEffect } from "react";

import { Goal, Record } from "api-client";
import { useLoaderData, useRevalidator } from "react-router-dom";

import { goalsApi } from "../api";
import { ResponsiveModal } from "../components/ResponsiveModal";

import { DisplayMode } from "./displayMode";
import { GoalsList } from "./GoalsList";
import { NewGoalForm } from "./NewGoalForm";
import { AppControlContext } from "../AppLayout";

export function GoalsPage() {
  const [
    newGoalDisclosure,
    { toggle: toggleNewGoalDisclosure, close: closeNewGoalDisclosure },
  ] = useDisclosure();

  const [goals, goalRecords] = useLoaderData() as [
    Goal[],
    { [goalId: string]: Record[] }
  ];
  const { revalidate } = useRevalidator();

  const [displayMode, setDisplayMode] = useLocalStorage({
    key: "goals-display-mode",
    defaultValue: DisplayMode.Grid,
  });

  const appControls = useContext(AppControlContext);

  useEffect(() => {
    appControls.setTitle("Goals");
    appControls.setLeadingAction({
      type: "icon-group",
      items: [
        {
          id: "set-display-grid",
          variant: displayMode === DisplayMode.Grid ? "filled" : "default",
          size: "lg",
          ariaLabel: "Gallery",
          icon: <IconLayoutGrid style={{ width: rem(20) }} stroke={1.5} />,
        },
        {
          id: "set-display-table",
          variant: displayMode === DisplayMode.Table ? "filled" : "default",
          size: "lg",
          ariaLabel: "Settings",
          icon: <IconColumns style={{ width: rem(20) }} stroke={1.5} />,
        },
      ],
    });
    appControls.setTrailingAction({
      type: "button",
      id: "new-goal",
      variant: "filled",
      content: "New goal",
    });
    appControls.onAction((actionId) => {
      switch (actionId) {
        case "set-display-grid":
          return setDisplayMode(DisplayMode.Grid);
        case "set-display-table":
          return setDisplayMode(DisplayMode.Table);
        case "new-goal":
          return toggleNewGoalDisclosure();
        default:
          return;
      }
    });
  }, [displayMode]);

  return (
    <Stack>
      <GoalsList
        goals={goals}
        goalRecords={goalRecords}
        displayMode={displayMode}
      />

      <ResponsiveModal
        title="Add goal"
        opened={newGoalDisclosure}
        onClose={closeNewGoalDisclosure}
      >
        <NewGoalForm
          onSubmit={async (newGoal) => {
            await goalsApi.createGoal({ goal: newGoal });
            closeNewGoalDisclosure();
            revalidate();
          }}
        />
      </ResponsiveModal>
    </Stack>
  );
}
