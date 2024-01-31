import React from "react";

import { Button, DefaultMantineColor, Progress, Table, parseThemeColor, useMantineTheme } from "@mantine/core";
import { mix } from "polished"

import { Goal } from "api-client";
import { Link } from "react-router-dom";

export interface GoalsTableProps {
  goals: Goal[];
}

const clamp = (min: number, value: number, max: number) => (
  Math.max(min, Math.min(value, max) )
)

export function GoalsTable({ goals }: GoalsTableProps) {
  // note: if it has the word use, it shouldn't be used in a for loop. needs to be higher up
  // google "rules of hooks" for more information
  const theme = useMantineTheme();

  const rows = goals.map((goal) => {
    const progressPercent = clamp(
      0,
      (goal.progress ?? 0 - goal.intervalStartAmount) / (goal.goalProgress ?? goal.intervalTargetAmount - goal.intervalStartAmount),
      1
    );
    const progressColour: DefaultMantineColor = mix(
      progressPercent,
      parseThemeColor({color : "teal", theme}).value,
      parseThemeColor({color : theme.primaryColor, theme}).value
    )
    return (
      <Table.Tr key={goal.id}>
        <Table.Td>{goal.name}</Table.Td>
        <Table.Td>{goal.unit}</Table.Td>
        <Table.Td>{goal.intervalTargetAmount}</Table.Td>
        <Table.Td>{goal.progress}</Table.Td>
        <Table.Td>{goal.goalProgress}</Table.Td>
        <Table.Td><Progress
          radius="xs"
          size="xl"
          color={progressColour}
          value={100 * progressPercent}
          style={{ width: 100 }}
        /></Table.Td>
        <Table.Td><Button
          component={Link} // note: we use 'Link' instead of 'a' because 'a' would make the whole page reload
          to={`/goals/${goal.id}`}
        >View</Button></Table.Td>
      </Table.Tr>
    )
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
