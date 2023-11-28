import React from "react";

import { Goal, Record } from "api-client";

import { GoalsGrid } from "./GoalsGrid";
import { GoalsTable } from "./GoalsTable";
import { DisplayMode } from "./displayMode";

interface GoalsListProps {
  displayMode: DisplayMode;
  goalRecords: { [goalId: string]: Record[] };
  goals: Goal[];
}

export function GoalsList({ goals, goalRecords, displayMode }: GoalsListProps) {
  switch (displayMode) {
    case DisplayMode.Table:
      return <GoalsTable goals={goals} />;
    default:
      return <GoalsGrid goals={goals} goalRecords={goalRecords} />;
  }
}
