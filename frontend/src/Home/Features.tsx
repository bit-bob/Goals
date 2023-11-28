import React from "react";

import {
  Card,
  SimpleGrid,
  Text,
  Title,
  rem,
  useMantineTheme,
} from "@mantine/core";
import { IconBolt, IconRefresh, IconTargetArrow } from "@tabler/icons-react";

import classes from "./Features.module.css";

const mockdata = [
  {
    title: "Stay on target",
    description:
      "Easily visualise your goals using our graphs. You can even add then to your home screen!",
    icon: IconTargetArrow,
  },
  {
    title: "Sync across devices",
    description:
      "Want to use Goals on your phone & desktop. We’ve got you covered!",
    icon: IconRefresh,
  },
  {
    title: "Automate logging",
    description:
      "It’s all too easy to forget to log something. Use siri shortcuts or even build your own webhooks to keep track of your goals.",
    icon: IconBolt,
  },
];

export function FeaturesCards() {
  const theme = useMantineTheme();
  const features = mockdata.map((feature) => (
    <Card
      className={classes.card}
      key={feature.title}
      padding="xl"
      radius="md"
      shadow="md"
    >
      <feature.icon
        color={theme.colors.blue[6]}
        stroke={2}
        style={{ width: rem(50), height: rem(50) }}
      />
      <Text className={classes.cardTitle} fw={500} fz="lg" mt="md">
        {feature.title}
      </Text>
      <Text c="dimmed" fz="sm" mt="sm">
        {feature.description}
      </Text>
    </Card>
  ));

  return (
    <>
      <Title className={classes.title} mt="xl" order={2}>
        It’s never been so easy to keep track on your personal targets!
      </Title>

      <Text c="dimmed" className={classes.description} mt="md">
        Stay organised & on track with your goals. Whether it be a monthly
        budget, the miles driven in your car, or even hours studying for exams.
      </Text>

      <SimpleGrid cols={{ base: 1, md: 3 }} mt={50} spacing="xl">
        {features}
      </SimpleGrid>
    </>
  );
}
