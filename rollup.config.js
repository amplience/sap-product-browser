import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';

export default [
    {
        input: './src/index.ts',
        output: {
                dir: './dist',
                format: 'umd',
                name: 'sap-product-browser'
        },
        plugins: [
            typescript({
                typescript: require('typescript')
            }),
            resolve(),
            commonjs()
        ]
    },
    {
        input: './src/index.ts',
        output: {
            file: 'dist/index.main.js',
            format: 'cjs'
        },
        plugins: [
            typescript({
                typescript: require('typescript')
            }),
            resolve(),
        ] 
    },
    {
        input: './src/index.ts',
        output: {
            file: 'dist/index.module.js',
            format: 'es'
        },
        plugins: [
            typescript({
                typescript: require('typescript')
            }),
            resolve(),
        ] 
    }
];