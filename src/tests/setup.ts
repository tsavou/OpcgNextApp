import "@testing-library/jest-dom";

import { vi } from "vitest";

global.confirm = vi.fn(() => true);

import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

afterEach(() => {
  cleanup();
});
