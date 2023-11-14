import React from "react";
import { useForm } from "@mantine/form";
import {
  Autocomplete,
  Button,
  Flex,
  Group,
  NumberInput,
  Stack,
  Switch,
  TextInput,
} from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { CreateGoalRequest } from "api-client";
import parse from "parse-duration";
// @ts-ignore
import humanizeDuration from "humanize-duration";

interface NewGoalFormProps {
  onSubmit: (request: CreateGoalRequest) => void;
}

const units = [
  "acre",
  "bit",
  "byte",
  "celsius",
  "centimeter",
  "day",
  "degree",
  "fahrenheit",
  "fluid",
  "foot",
  "gallon",
  "gigabit",
  "gigabyte",
  "gram",
  "hectare",
  "hour",
  "inch",
  "kilobit",
  "kilobyte",
  "kilogram",
  "kilometer",
  "liter",
  "megabit",
  "megabyte",
  "meter",
  "mile",
  "milliliter",
  "millimeter",
  "millisecond",
  "minute",
  "month",
  "ounce",
  "percent",
  "petabyte",
  "pound",
  "second",
  "stone",
  "terabit",
  "terabyte",
  "week",
  "yard",
  "year",
];

function parseHumanDuration(v?: string) {
  const parsed = parse(v ?? "", "sec");
  if (parsed === undefined || !v) {
    return;
  }
  return humanizeDuration(parsed * 1000);
}

export function NewGoalForm({ onSubmit }: NewGoalFormProps) {
  const form = useForm<Partial<CreateGoalRequest>>({
    initialValues: {
      name: "",
      intervalStartDate: new Date(),
      reset: false,
    },
    validate: {
      name: (value) => (Boolean(value) ? null : "Name required"),
      intervalLength: (value) =>
        Number(parse(value ?? "", "sec")) > 0 ? null : "Invalid duration",
      bucketSize: (value) =>
        Number(parse(value ?? "", "sec")) > 0 ? null : "Invalid duration",
      unit: (value) => (Boolean(value) ? null : "Unit required"),
      intervalStartAmount: (value) =>
        typeof value === "number" ? null : "Interval start amount required",
      intervalTargetAmount: (value) =>
        typeof value === "number" ? null : "Interval target amount required",
    },
    transformValues(values) {
      return {
        ...values,
        intervalLength: `PT${parse(values.intervalLength ?? "", "sec")}S`,
        bucketSize: `PT${parse(values.bucketSize ?? "", "sec")}S`,
      };
    },
  });

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        onSubmit(values as CreateGoalRequest);
      })}
    >
      <Stack gap="md">
        <TextInput
          label="Name"
          placeholder="Calories"
          {...form.getInputProps("name")}
        />

        <DateTimePicker
          label="Interval start date"
          {...form.getInputProps("intervalStartDate")}
        />

        <TextInput
          label="Interval length"
          placeholder="1d"
          {...form.getInputProps("intervalLength")}
          description={parseHumanDuration(form.values.intervalLength)}
        />

        <TextInput
          label="Bucket size"
          placeholder="5m"
          {...form.getInputProps("bucketSize")}
          description={parseHumanDuration(form.values.bucketSize)}
        />

        <Autocomplete
          label="Unit"
          placeholder="Pick value"
          data={units}
          {...form.getInputProps("unit")}
        />

        <Flex gap="lg" w="100%">
          <NumberInput
            label="Interval start amount"
            placeholder="0.0"
            allowDecimal
            {...form.getInputProps("intervalStartAmount")}
          />

          <NumberInput
            label="Interval target amount"
            placeholder="2000.0"
            allowDecimal
            {...form.getInputProps("intervalTargetAmount")}
          />
        </Flex>

        <Switch label="Resets?" {...form.getInputProps("reset")} />
      </Stack>

      <Group justify="flex-end" mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
}
