import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Sparklines, SparklinesLine } from "react-sparklines";

import { Card, NumberFormatter, SimpleGrid, Text } from "@mantine/core";
import { Goal, Record } from "api-client";

import { getGraphDataFromRecords } from "../getGraphDataFromRecords";
// import { GoalsWidgetBridge } from "capacitor-plugin-goals-widget-bridge";

export interface GoalsGridProps {
  goalRecords: { [goalId: string]: Record[] };
  goals: Goal[];
}

export function GoalsGrid({ goals, goalRecords }: GoalsGridProps) {
  useEffect(() => {
    goals.forEach(() => {
      // GoalsWidgetBridge.();
    });
  }, [goals, goalRecords]);
  return (
    <SimpleGrid
      cols={{ base: 1, sm: 1, md: 2, lg: 3, xl: 4 }}
      spacing={{ base: 10, sm: "xl" }}
    >
      {goals.map((goal) => {
        const data = getGraphDataFromRecords(goalRecords[goal.id!]).entries.map(
          (v) => v.value
        );
        const currentVal = data.length > 0 ? data[data.length - 1] : 0;
        return (
          <Card
            bg="var(--mantine-color-body)"
            component={Link}
            key={goal.id}
            padding="xl"
            radius="md"
            to={`/goals/${goal.id}`}
            withBorder
          >
            <Text c="dimmed" fw={700} fz="xs" tt="uppercase">
              {goal.name}
            </Text>
            <Text fw={500} fz="lg">
              <NumberFormatter
                suffix={` ${goal.unit}`}
                value={currentVal}
                thousandSeparator
              />{" "}
              /{" "}
              <NumberFormatter
                suffix={` ${goal.unit}`}
                value={goal.intervalTargetAmount}
                thousandSeparator
              />
            </Text>
            <Sparklines data={data} height={40}>
              <SparklinesLine color="var(--mantine-color-blue-6)" />
            </Sparklines>
          </Card>
        );
      })}
    </SimpleGrid>
  );
}
