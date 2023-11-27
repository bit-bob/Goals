import React from "react";
import { FeaturesCards } from "./Features";
import { Hero } from "./Hero";
import { Container } from "@mantine/core";
import { Footer } from "./Footer";

export const HomePage = () => {
  return (
    <>
      <Hero />
      <Container>
        <FeaturesCards />
      </Container>
      <Footer />
    </>
  );
};
