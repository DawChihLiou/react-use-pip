import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import external from 'rollup-plugin-peer-deps-external'
import filesize from 'rollup-plugin-filesize'

export default {
  input: 'src/index.ts',
  output: [
    {
      dir: 'dist',
      format: 'cjs',
      sourcemap: true,
    },
  ],
  plugins: [
    typescript(),
    external(),
    babel({
      babelHelpers: 'runtime',
      exclude: 'node_modules/**',
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }),
    resolve({
      jsnext: true,
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }),
    commonjs(),
    filesize(),
  ],
}
