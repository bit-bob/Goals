import { Goal, Record } from "api-client";
import React from "react";

import { DisplayMode } from "./displayMode";
import { GoalsGrid } from "./GoalsGrid";
import { GoalsTable } from "./GoalsTable";

interface GoalsListProps {
  goals: Goal[];
  goalRecords: { [goalId: string]: Record[] };
  displayMode: DisplayMode;
}

export function GoalsList({ goals, goalRecords, displayMode }: GoalsListProps) {
  switch (displayMode) {
    case DisplayMode.Table:
      return <GoalsTable goals={goals} />;
    default:
      return <GoalsGrid goals={goals} goalRecords={goalRecords} />;
  }
}
