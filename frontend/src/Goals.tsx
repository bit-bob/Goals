import React from "react";
import { Link, useLoaderData, useRevalidator } from "react-router-dom";

import { Card, Flex, Progress, SimpleGrid, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import {
  Goal,
} from "api-client";

import { NewGoalForm } from "./NewGoalForm";
import { ResponsiveModal } from "./ResponsiveModal";
import { goalsApi } from "./api";

export default function Goals() {
  const [
    newGoalDisclosure,
    { toggle: toggleNewGoalDisclosure, close: closeNewGoalDisclosure },
  ] = useDisclosure();

  const goals = useLoaderData() as Goal[];
  const { revalidate } = useRevalidator();

  return (
    <>
      <SimpleGrid
        cols={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
        spacing={{ base: 10, sm: "xl" }}
      >
        <Card
          bg="blue"
          component="button"
          onClick={toggleNewGoalDisclosure}
          padding="xl"
          radius="md"
          style={{ cursor: "pointer" }}
        >
          <Flex align="center" h="100%" justify="center" w="100%">
            <IconPlus />
          </Flex>
        </Card>
        {goals.map((goal) => (
          <Card
            bg="var(--mantine-color-body)"
            component={Link}
            key={goal.id}
            padding="xl"
            radius="md"
            to={`/${goal.id}`}
            withBorder
          >
            <Text c="dimmed" fw={700} fz="xs" tt="uppercase">
              {goal.name}
            </Text>
            <Text fw={500} fz="lg">
              $5.431 / $10.000
            </Text>
            <Progress mt="md" radius="xl" size="lg" value={54.31} />
          </Card>
        ))}
      </SimpleGrid>
      <ResponsiveModal
        onClose={closeNewGoalDisclosure}
        opened={newGoalDisclosure}
        title="Add goal"
      >
        <NewGoalForm
          onSubmit={async (newGoal) => {
            await goalsApi.createGoal({ goal: newGoal });
            closeNewGoalDisclosure();
            revalidate();
          }}
        />
      </ResponsiveModal>
    </>
  );
}
