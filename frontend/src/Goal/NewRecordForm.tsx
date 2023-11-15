import { Button, Group, NumberInput, Stack } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { Goal, Record } from "api-client";
import React from "react";

import { ResponsiveModal } from "../components/ResponsiveModal";

interface NewRecordFormProps {
  opened: boolean;
  onClose: () => void;
  goal: Goal;
  onSubmit: (record: Record) => void;
}

export function NewRecordForm({
  opened,
  onClose,
  goal,
  onSubmit,
}: NewRecordFormProps) {
  const form = useForm<Record>({
    initialValues: {
      goalId: goal.id!,
      date: new Date(),
      amount: 0,
    },
  });

  return (
    <ResponsiveModal
      title={`Log ${goal.name.toLowerCase()}`}
      opened={opened}
      onClose={onClose}
    >
      <form onSubmit={form.onSubmit(onSubmit)}>
        <Stack gap="md">
          <DateTimePicker label="Date" {...form.getInputProps("date")} />

          <NumberInput
            label="Amount"
            placeholder="0.0"
            allowDecimal
            {...form.getInputProps("amount")}
          />
        </Stack>

        <Group justify="flex-end" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </ResponsiveModal>
  );
}
