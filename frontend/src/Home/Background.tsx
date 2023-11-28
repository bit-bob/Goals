import React, { useCallback } from "react";
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";

export const Background = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      height="100vh"
      style={{
        position: "relative",
        height: "100vh",
        zIndex: -1,
      }}
      options={{
        fullScreen: false,
        fpsLimit: 120,
        interactivity: {
          modes: {
            repulse: {
              distance: 200,
              duration: 500,
            },
          },
        },
        particles: {
          color: {
            value: "#444444",
          },
          links: {
            color: "#444444",
            distance: 200,
            enable: true,
            opacity: 0.5,
            width: 1,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: true,
            speed: 2,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 2048,
            },
            value: 80,
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 0.5, max: 2 },
          },
        },
        detectRetina: true,
      }}
    />
  );
};