import React from "react";
import { Link } from "react-router-dom";

import { Button, Container, Flex, Group, Text } from "@mantine/core";
import { IconBrandGithub } from "@tabler/icons-react";

import { DownloadAppButton, Platform } from "../components/DownloadAppButton";
import { Background } from "./Background";
import { Logo } from "./Logo";

import classes from "./Hero.module.css";

interface HeroProps {
  onClickLearnMore?: () => void;
}

export function Hero({ onClickLearnMore }: HeroProps) {
  return (
    <>
      <Background />
      <Container mt="-100vh">
        <Flex direction="column" h="100vh" justify="center">
          <Flex align="center" gap="md">
            <Logo />
            <h1 className={classes.title}>
              <Text
                component="span"
                fw="1000"
                gradient={{ from: "yellow", to: "orange" }}
                variant="gradient"
                inherit
              >
                Your goals,
              </Text>
              <br />
              <Text component="span" fw="400" inherit>
                your way.
              </Text>
            </h1>
          </Flex>

          <Group className={classes.controls}>
            <DownloadAppButton platform={Platform.AppStore} />
            <DownloadAppButton platform={Platform.GooglePlay} />
          </Group>

          <Group className={classes.controls}>
            <Button
              className={classes.control}
              component={Link}
              gradient={{ from: "orange", to: "yellow" }}
              radius="md"
              size="lg"
              to="/goals"
              variant="gradient"
            >
              Get started
            </Button>

            <Button
              className={classes.control}
              component="a"
              href="https://github.com/HelinaBerhane/Goals"
              leftSection={<IconBrandGithub size={20} />}
              radius="md"
              size="lg"
              target="_blank"
              variant="default"
            >
              GitHub
            </Button>
          </Group>

          <Text c="dimmed" className={classes.description} mt="md">
            Keep track of the things that matter to you with ease.
          </Text>

          <Group mt="md">
            <Button onClick={onClickLearnMore} p={0} variant="transparent">
              Learn more
            </Button>
          </Group>
        </Flex>
      </Container>
    </>
  );
}
