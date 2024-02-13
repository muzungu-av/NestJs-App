import { pluginReact } from "@rsbuild/plugin-react";
import { defineConfig, loadEnv } from "@rsbuild/core";

const { publicVars } = loadEnv({ prefixes: ["REACT_APP_"] });

export default defineConfig({
  plugins: [pluginReact()],
  source: {
    define: publicVars,
  },
});
