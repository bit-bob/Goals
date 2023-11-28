import React, { useCallback, useRef } from "react";

import { Container } from "@mantine/core";

import { FeaturesCards } from "./Features";
import { Footer } from "./Footer";
import { Hero } from "./Hero";

export const HomePage = () => {
  const ref = useRef<HTMLDivElement>(null);
  const scrollToFeatures = useCallback(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [ref.current]);
  return (
    <>
      <Hero onClickLearnMore={scrollToFeatures} />
      <Container ref={ref}>
        <FeaturesCards />
      </Container>
      <Footer />
    </>
  );
};
