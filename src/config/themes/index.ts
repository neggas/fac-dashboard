"use client";
import {
  createSystem,
  defaultConfig,
  defineConfig,
  mergeConfigs,
} from "@chakra-ui/react";

import { colors } from "./foundations/colors";

const custumConfig = defineConfig({
  theme: {
    tokens: {
      colors: colors,
      fonts: {
        body: { value: "'Roboto',sans-serif" },
      },
    },
  },
});

const themeConfig = mergeConfigs(defaultConfig, custumConfig);
const themeSystem = createSystem(themeConfig);

export default themeSystem;
