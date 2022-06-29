const { build } = require("esbuild");
const chokidar = require("chokidar");
const liveServer = require("live-server");
const postCssPlugin = require("esbuild-plugin-postcss2");
const autoprefixer = require("autoprefixer");
const tailwindcss = require("tailwindcss");
const cssModulesPlugin = require("esbuild-css-modules-plugin");
const postCssImport = require("postcss-import");
(async () => {
  // `esbuild` bundler for JavaScript / TypeScript.
  const builder = await build({
    // Bundles JavaScript.
    bundle: true,
    // Defines env variables for bundled JavaScript; here `process.env.NODE_ENV`
    // is propagated with a fallback.
    define: {
      "process.env.NODE_ENV": JSON.stringify(
        process.env.NODE_ENV || "development"
      ),
    },
    // Bundles JavaScript from (see `outfile`).
    entryPoints: ["./src/index.tsx"],
    // Uses incremental compilation (see `chokidar.on`).
    incremental: true,
    // Removes whitespace, etc. depending on `NODE_ENV=...`.
    minify: process.env.NODE_ENV === "production",
    // Bundles JavaScript to (see `entryPoints`).
    outfile: "public/script.js",
    plugins: [
      cssModulesPlugin(),
      postCssPlugin.default({
        plugins: [
          autoprefixer(),
          tailwindcss({
            content: ["./src/**/*.{tsx,ts,jsx,js,html}"],
            theme: {
              extend: {},
            },
            plugins: [],
          }),
        ],
        modules: true,
        rootDir: process.cwd(),
        stylusOptions: {},
        writeToFile: true,
      }),
    ],
  });
  // `chokidar` watcher source changes.
  chokidar
    // Watches TypeScript and React TypeScript.
    .watch("src/**/*.{ts,tsx,css}", {
      interval: 0, // No delay
    })
    // Rebuilds esbuild (incrementally -- see `build.incremental`).
    .on("all", () => {
      builder.rebuild();
    });
  // `liveServer` local server for hot reload.
  liveServer.start({
    // Opens the local server on start.
    open: true,
    // Uses `PORT=...` or 8080 as a fallback.
    port: +process.env.PORT || 8080,
    // Uses `public` as the local server folder.
    root: "public",
  });
})();
