import { Card, Flex, Progress, SimpleGrid, Text } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { Goal } from "api-client";
import React from "react";
import { Link } from "react-router-dom";

export interface GoalsGridProps {
  toggleNewGoalDisclosure: () => void;
  goals: Goal[];
}

export function GoalsGrid({ toggleNewGoalDisclosure, goals }: GoalsGridProps) {
  return (
    <SimpleGrid
      cols={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
      spacing={{ base: 10, sm: "xl" }}
    >
      {goals.map((goal) => (
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
            $5.431 / $10.000
          </Text>
          <Progress value={54.31} mt="md" size="lg" radius="xl" />
        </Card>
      ))}
    </SimpleGrid>
  );
}
