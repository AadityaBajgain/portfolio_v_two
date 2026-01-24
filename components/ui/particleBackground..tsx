"use client"
import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { type ISourceOptions, type Container } from "@tsparticles/engine";

const getThemeColors = () => {
  const styles = getComputedStyle(document.documentElement);
  const background = styles.getPropertyValue("--background").trim() || "#0d1117";
  const particle = styles.getPropertyValue("--particle-color").trim() || "#ffffff";
  const link = styles.getPropertyValue("--particle-link").trim() || particle;

  return { background, particle, link };
};

const ParticleBackground = () => {
  const [init, setInit] = useState(false);
  const [themeColors, setThemeColors] = useState({
    background: "#0d1117",
    particle: "#ffffff",
    link: "#ffffff",
  });

  // This should only run once to initialize the engine
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  useEffect(() => {
    const updateColors = () => {
      setThemeColors(getThemeColors());
    };

    updateColors();

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handleMediaChange = () => updateColors();

    if (media.addEventListener) {
      media.addEventListener("change", handleMediaChange);
    } else {
      media.addListener(handleMediaChange);
    }

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === "attributes" && mutation.attributeName === "class") {
          updateColors();
          break;
        }
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      if (media.removeEventListener) {
        media.removeEventListener("change", handleMediaChange);
      } else {
        media.removeListener(handleMediaChange);
      }
      observer.disconnect();
    };
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log("Particles container loaded", container);
  };

  // Your screenshot settings converted to a TS object
  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: {
        enable: false,
        zIndex: 0,
      },
      background: {
        color: {
          value: themeColors.background,
        },
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: { enable: true, mode: "push" },
          onHover: { enable: true, mode: "repulse" },
        },
        modes: {
          push: { quantity: 4 },
          repulse: { distance: 200, duration: 0.4 },
        },
      },
      particles: {
        color: { value: themeColors.particle },
        links: {
          color: themeColors.link,
          distance: 150,
          enable: true,
          opacity: 0.5,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: { default: "bounce" },
          random: false,
          speed: 2,
          straight: false,
        },
        number: {
          density: { enable: true },
          value: 80,
        },
        opacity: { value: 0.5 },
        shape: { type: "circle" },
        size: { value: { min: 1, max: 5 } },
      },
      detectRetina: true,
    }),
    [themeColors]
  );

  if (init) {
    return (
      <Particles
        id="tsparticles"
        className="absolute inset-0"
        particlesLoaded={particlesLoaded}
        options={options}
      />
    );
  }

  return null;
};

export default ParticleBackground;
