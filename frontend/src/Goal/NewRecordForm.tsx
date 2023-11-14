import React from "react";
import { useForm } from "@mantine/form";
import { Button, Group, NumberInput, Stack } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { Record } from "api-client";

interface NewRecordFormProps {
  goalId: string;
  onSubmit: (record: Record) => void;
}

export function NewRecordForm({ goalId, onSubmit }: NewRecordFormProps) {
  const form = useForm<Record>({
    initialValues: {
      goalId,
      date: new Date(),
      amount: 0,
    },
  });

  return (
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
  );
}
