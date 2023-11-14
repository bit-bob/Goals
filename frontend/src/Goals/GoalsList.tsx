import { Goal } from "api-client";
import React from "react";

import { DisplayMode } from "./displayMode";
import { GoalsGrid } from "./GoalsGrid";
import { GoalsTable } from "./GoalsTable";

interface GoalsListProps {
  goals: Goal[];
  displayMode: DisplayMode;
  toggleNewGoalDisclosure: () => void;
}

export function GoalsList({
  goals,
  displayMode,
  toggleNewGoalDisclosure,
}: GoalsListProps) {
  switch (displayMode) {
    case DisplayMode.Table:
      return <GoalsTable goals={goals} />;
    default:
      return (
        <GoalsGrid
          goals={goals}
          toggleNewGoalDisclosure={toggleNewGoalDisclosure}
        />
      );
  }
}
