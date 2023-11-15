import {
  Card,
  Flex,
  NumberFormatter,
  Progress,
  SimpleGrid,
  Text,
} from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { Goal, Record } from "api-client";
import React from "react";
import { Link } from "react-router-dom";
import { Sparklines, SparklinesLine } from "react-sparklines";
import { getGraphDataFromRecords } from "../getGraphDataFromRecords";

export interface GoalsGridProps {
  goals: Goal[];
  goalRecords: { [goalId: string]: Record[] };
}

export function GoalsGrid({ goals, goalRecords }: GoalsGridProps) {
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
            key={goal.id}
            withBorder
            radius="md"
            padding="xl"
            bg="var(--mantine-color-body)"
            component={Link}
            to={`/${goal.id}`}
          >
            <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
              {goal.name}
            </Text>
            <Text fz="lg" fw={500}>
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
