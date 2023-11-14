import React from "react";
import { Await, Link, useLoaderData, useRevalidator } from "react-router-dom";
import { Goal, Progress, Record } from "api-client";
import { Button, Flex, Skeleton, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { ResponsiveModal } from "../ResponsiveModal";

import { RecordsTable, RecordsTableSkeleton } from "./RecordsTable";
import { NewRecordForm } from "./NewRecordForm";
import { goalsApi } from "../api";
import { IconChevronLeft } from "@tabler/icons-react";
import { ProgressChart } from "./ProgressChart";

export function GoalPage() {
  const { goal, progress, records } = useLoaderData() as {
    goal: Goal;
    progress: Promise<Progress>;
    records: Promise<Record[]>;
  };
  const { revalidate } = useRevalidator();
  const [
    newRecordFormOpened,
    { open: openNewRecordForm, close: closeNewRecordForm },
  ] = useDisclosure();

  console.log(records);

  return (
    <Stack>
      {/* {progress && <ProgressChart />} */}
      <Flex justify="space-between">
        <Button
          component={Link}
          to="/"
          variant="subtle"
          leftSection={<IconChevronLeft />}
        >
          Back
        </Button>
        <Button onClick={openNewRecordForm}>
          Log {goal.name.toLowerCase()}
        </Button>
      </Flex>

      <React.Suspense fallback={<RecordsTableSkeleton rowCount={4} />}>
        <Await
          resolve={records}
          errorElement={<div>Could not load reviews 😬</div>}
          children={(resolvedRecords: Record[]) => {
            console.log(resolvedRecords);
            return <RecordsTable records={resolvedRecords} />;
          }}
        />
      </React.Suspense>

      <ResponsiveModal
        title={`Log ${goal.name.toLowerCase()}`}
        opened={newRecordFormOpened}
        onClose={closeNewRecordForm}
      >
        <NewRecordForm
          goalId={goal.id!}
          onSubmit={async (newRecord) => {
            await goalsApi.createRecord({ record: newRecord });
            closeNewRecordForm();
            revalidate();
          }}
        />
      </ResponsiveModal>
    </Stack>
  );
}
