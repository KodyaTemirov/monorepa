import esbuild from 'esbuild'
import { nodeExternalsPlugin } from 'esbuild-node-externals'
import postCssPlugin from 'esbuild-plugin-postcss2';
import autoprefixer from 'autoprefixer'
import tailwindcss from 'tailwindcss'
import postCssImport from 'postcss-import';
esbuild.build({
  entryPoints: ['src/index.ts'],
  outdir: 'dist/esm',
  bundle: true,
  sourcemap: true,
  minify: true,
  splitting: true,
  format: 'esm',
  target: 'esnext',
  plugins: [
    nodeExternalsPlugin(), 
    postCssPlugin.default({
    plugins: [postCssImport, autoprefixer, tailwindcss({
      content: ["./src/**/*.{tsx,ts,jsx,js,html}"],
      theme: {
        extend: {},
      },
      plugins: [],
    })],
    modules: true,
    rootDir: process.cwd(),
    stylusOptions: {},
    writeToFile: true,
  }),],
})

esbuild.build({
  entryPoints: ['src/index.ts'],
  outdir: 'dist/cjs',
  bundle: true,
  sourcemap: true,
  minify: true,
  format: 'cjs',
  target: 'esnext',
  plugins: [ 
    nodeExternalsPlugin(),
    postCssPlugin.default({
      plugins: [postCssImport, autoprefixer, tailwindcss({
        content: ["./src/**/*.{tsx,ts,jsx,js,html}"],
        theme: {
          extend: {},
        },
        plugins: [],
      })],
      modules: true,
      rootDir: process.cwd(),
      stylusOptions: {},
      writeToFile: true,
    }),],
})