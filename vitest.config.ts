import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		globals: true,
		environment: "jsdom",
		setupFiles: ["./src/tests/setup.ts"],
		server: {
			deps: {
				// https://github.com/vercel/next.js/issues/77200
				inline: ["next-intl"],
			},
		},
		typecheck: {
			tsconfig: "./tsconfig.vitest.json",
		},
	},
	envPrefix: "NEXT_PUBLIC_",
	esbuild: {
		jsx: "automatic",
	},
	resolve: {
		alias: {
			"@": path.resolve(import.meta.dirname, "./src"),
		},
	},
});
