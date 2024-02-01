import React from "react";
import { Link } from "react-router-dom";

import {
  Button,
  DefaultMantineColor,
  Progress,
  Table,
  Tooltip,
  parseThemeColor,
  useMantineTheme,
} from "@mantine/core";
import { Goal } from "api-client";
import { mix } from "polished";

export interface GoalsTableProps {
  goals: Goal[];
  onDelete: (goalId: string) => void;
}

const clamp = (min: number, value: number, max: number) =>
  Math.max(min, Math.min(value, max));

export function GoalsTable({ goals, onDelete }: GoalsTableProps) {
  // note: if it has the word use, it shouldn't be used in a for loop. needs to be higher up
  // google "rules of hooks" for more information
  const theme = useMantineTheme();

  const rows = goals.map((goal) => {
    const progress = goal.progress ?? 0
    const goalProgress = goal.goalProgress ??
          goal.intervalTargetAmount
    const progressPercent = clamp(
      0,
      (progress - goal.intervalStartAmount) / (goalProgress - goal.intervalStartAmount),
      1
    );
    const progressPercentRounded = Math.round(100 * progressPercent)
    const progressColour: DefaultMantineColor = mix(
      progressPercent,
      parseThemeColor({ color: "teal", theme }).value,
      parseThemeColor({ color: theme.primaryColor, theme }).value
    );
    return (
      <Table.Tr key={goal.id}>
        <Table.Td>{goal.name}</Table.Td>
        <Table.Td>{goal.unit}</Table.Td>
        <Table.Td>{goal.intervalTargetAmount}</Table.Td>
        <Table.Td>{progress}</Table.Td>
        <Table.Td>{Number(goalProgress.toPrecision(3))}</Table.Td>
        <Table.Td>
        <Tooltip label={`${progressPercentRounded} %`}>
          <Progress
            color={progressColour}
            radius="xs"
            size="xl"
            style={{ width: 100 }}
            value={progressPercentRounded}
          />
        </Tooltip>
        </Table.Td>
        {/* // note: we use 'Link' instead of 'a' because 'a' would make the whole page reload */}
        <Table.Td>
          <Button component={Link} to={`/goals/${goal.id}`}>
            View
          </Button>
        </Table.Td>
        <Table.Td>
          <Button onClick={() => onDelete(goal.id!)} variant="danger">
            Delete
          </Button>
        </Table.Td>
      </Table.Tr>
    );
  });

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Name</Table.Th>
          <Table.Th>Unit</Table.Th>
          <Table.Th>Target Amount</Table.Th>
          <Table.Th>Progress</Table.Th>
          <Table.Th>Goal Progress</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}
