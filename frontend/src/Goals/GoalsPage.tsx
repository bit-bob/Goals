import { ActionIcon, Button, Flex, Stack, rem } from "@mantine/core";
import { useDisclosure, useLocalStorage } from "@mantine/hooks";
import { IconColumns, IconLayoutGrid } from "@tabler/icons-react";
import React, { useState } from "react";

import { Goal } from "api-client";
import { useLoaderData, useRevalidator } from "react-router-dom";

import { goalsApi } from "../api";
import { NewGoalForm } from "../NewGoalForm";
import { ResponsiveModal } from "../ResponsiveModal";

import { DisplayMode } from "./displayMode";
import { GoalsList } from "./GoalsList";

export function GoalsPage() {
  const [
    newGoalDisclosure,
    { toggle: toggleNewGoalDisclosure, close: closeNewGoalDisclosure },
  ] = useDisclosure();

  const goals = useLoaderData() as Goal[];
  const { revalidate } = useRevalidator();

  const [displayMode, setDisplayMode] = useLocalStorage({
    key: "goals-display-mode",
    defaultValue: DisplayMode.Grid,
  });

  return (
    <Stack>
      <Flex justify="space-between">
        <Button onClick={toggleNewGoalDisclosure}>New goal</Button>
        <ActionIcon.Group>
          <ActionIcon
            variant={displayMode === DisplayMode.Grid ? "filled" : "default"}
            size="lg"
            aria-label="Gallery"
            onClick={() => setDisplayMode(DisplayMode.Grid)}
          >
            <IconLayoutGrid style={{ width: rem(20) }} stroke={1.5} />
          </ActionIcon>

          <ActionIcon
            variant={displayMode === DisplayMode.Table ? "filled" : "default"}
            size="lg"
            aria-label="Settings"
            onClick={() => setDisplayMode(DisplayMode.Table)}
          >
            <IconColumns style={{ width: rem(20) }} stroke={1.5} />
          </ActionIcon>
        </ActionIcon.Group>
      </Flex>

      <GoalsList
        goals={goals}
        displayMode={displayMode}
        toggleNewGoalDisclosure={toggleNewGoalDisclosure}
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
