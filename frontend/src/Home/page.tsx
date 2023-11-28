import React from "react";

import { Container } from "@mantine/core";

import { FeaturesCards } from "./Features";
import { Footer } from "./Footer";
import { Hero } from "./Hero";

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
