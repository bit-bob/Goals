import React from "react";
import { Container, Text, Button, Group, Flex } from "@mantine/core";
import { IconBrandGithub } from "@tabler/icons-react";
import classes from "./Hero.module.css";
import { DownloadAppButton } from "../components/DownloadAppButton";
import { useNavigate } from "react-router-dom";
import { Background } from "./Background";
import { Logo } from "./Logo";

export function Hero() {
  const navigate = useNavigate();
  return (
    <>
      <Background />
      <Container mt="-100vh">
        <Flex direction="column" h="100vh" justify="center">
          <Flex gap="md" align="center">
            <Logo />
            <h1 className={classes.title}>
              <Text
                component="span"
                variant="gradient"
                gradient={{ from: "blue", to: "cyan" }}
                inherit
              >
                Your goals,
              </Text>
              <br />
              Your way.
            </h1>
          </Flex>

          <Text className={classes.description} c="dimmed">
            Keep track of the things that matter to you with ease.
          </Text>

          <Group className={classes.controls}>
            <Button
              radius="md"
              size="xl"
              className={classes.control}
              variant="gradient"
              gradient={{ from: "blue", to: "cyan" }}
              onClick={() => navigate("/goals")}
            >
              Get started
            </Button>

            <DownloadAppButton />

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
