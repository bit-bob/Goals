import React from "react";
import { useRevalidator } from "react-router-dom";

import { Goal, Record } from "api-client";

import { goalsApi } from "../api";
import { GoalsGrid } from "./GoalsGrid";
import { GoalsTable } from "./GoalsTable";
import { DisplayMode } from "./displayMode";

interface GoalsListProps {
  displayMode: DisplayMode;
  goalRecords: { [goalId: string]: Record[] };
  goals: Goal[];
}

export function GoalsList({ goals, goalRecords, displayMode }: GoalsListProps) {
  // note: hooks need to be inside the react component
  // note: hooks begin with the word use by convention
  const { revalidate } = useRevalidator();

  switch (displayMode) {
    case DisplayMode.Table:
      return <GoalsTable onDelete={async (id) => {
            await goalsApi.deleteGoal({ goalId: id });
            revalidate();
          }} 
          goals={goals}/>;
    default:
      return <GoalsGrid goalRecords={goalRecords} goals={goals} />;
  }
}
