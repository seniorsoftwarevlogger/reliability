"use client";

import { Flowbite } from "flowbite-react";
import { flowbiteTheme as theme } from "./theme.js";

const FlowbiteContext = function ({ children }) {
  return <Flowbite theme={{ theme }}>{children}</Flowbite>;
};

export default FlowbiteContext;
