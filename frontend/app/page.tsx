"use client";
import { useDisclosure } from "@mantine/hooks";
import { AppShell, Burger, Button, Flex, Group, NavLink } from "@mantine/core";
import { useEffect, useState } from "react";
import { IconChevronRight } from "@tabler/icons-react";
import { ResponsiveModal } from "./ResponsiveModal";
import { NewGoalForm } from "./NewGoalForm";

import { GoalsModel, DefaultApi, Configuration } from "api-client";

// (new DefaultApi()).

const goalsApi = new DefaultApi(
  new Configuration({
    basePath: "http://192.168.1.179:8000",
  })
);

interface Goal {
  id: string;
  name: string;
  interval_start_date?: string;
  interval_start_amount?: number;
  interval_target_amount?: number;
  interval_length?: number;
  bucket_size?: number;
  unit?: string;
  reset?: boolean;
  created_date?: number;
}

export default function BasicAppShell() {
  const [opened, { toggle }] = useDisclosure();
  const [
    newGoalDisclosure,
    { toggle: toggleNewGoalDisclosure, close: closeNewGoalDisclosure },
  ] = useDisclosure();
  const [goals, setGoals] = useState<GoalsModel[]>([]);

  const refresh = async () => {
    setGoals((await goalsApi.getGoals()).goals);
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header top="var(--inset-top)">
        <Flex h="100%" px="md" align="center" justify="space-between">
          <Group h="100%">
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
            Goals
          </Group>

          <Button onClick={toggleNewGoalDisclosure}>New goal</Button>
        </Flex>
      </AppShell.Header>
      <AppShell.Navbar top="calc(var(--_section-top,var(--app-shell-header-offset,0)) + var(--inset-top))">
        {goals.map((goal) => (
          <NavLink
            key={goal.id}
            label={goal.name}
            //   leftSection={<IconActivity size="1rem" stroke={1.5} />}
            rightSection={<IconChevronRight size="0.8rem" stroke={1.5} />}
            active
          />
        ))}
      </AppShell.Navbar>
      <AppShell.Main pt="calc(var(--app-shell-header-offset, 0px) + var(--inset-top) + var(--app-shell-padding))">
        Main
      </AppShell.Main>
      <ResponsiveModal
        title="Add goal"
        opened={newGoalDisclosure}
        onClose={closeNewGoalDisclosure}
      >
        <NewGoalForm
          onSubmit={async (createGoalRequest) => {
            await goalsApi.createGoal({ createGoalRequest });
            refresh();
          }}
        />
      </ResponsiveModal>
    </AppShell>
  );
}
