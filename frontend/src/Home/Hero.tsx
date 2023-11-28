import React from "react";
import { Link } from "react-router-dom";

import { Button, Container, Flex, Group, Text } from "@mantine/core";
import { IconBrandGithub } from "@tabler/icons-react";

import { DownloadAppButton, Platform } from "../components/DownloadAppButton";
import { Background } from "./Background";
import { Logo } from "./Logo";

import classes from "./Hero.module.css";

export function Hero() {
  return (
    <>
      <Background />
      <Container mt="-100vh">
        <Flex direction="column" h="100vh" justify="center">
          <Flex gap="md" align="center">
            <Logo />
            <h1 className={classes.title}>
              <Text
                fw="1000"
                component="span"
                variant="gradient"
                gradient={{ from: "yellow", to: "orange" }}
                inherit
              >
                Your goals,
              </Text>
              <br />
              <Text fw="400" component="span" inherit>
                your way.
              </Text>
            </h1>
          </Flex>

          <Group className={classes.controls}>
            <DownloadAppButton platform={Platform.AppStore} />
            <DownloadAppButton platform={Platform.GooglePlay} />
          </Group>

          <Text className={classes.description} c="dimmed">
            Keep track of the things that matter to you with ease.
          </Text>

          <Group className={classes.controls}>
            <Button
              radius="md"
              component={Link}
              size="xl"
              className={classes.control}
              variant="gradient"
              gradient={{ from: "orange", to: "yellow" }}
              to="/goals"
            >
              Get started
            </Button>

            <Button
              radius="md"
              component="a"
              target="_blank"
              href="https://github.com/HelinaBerhane/Goals"
              size="xl"
              variant="default"
              className={classes.control}
              leftSection={<IconBrandGithub size={20} />}
            >
              GitHub
            </Button>
          </Group>

          <Group mt="md">
            <Button variant="transparent" p={0}>
              Learn more
            </Button>
          </Group>
        </Flex>
      </Container>
    </>
  );
}
