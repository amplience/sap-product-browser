import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';

export default [
    {
        input: './src/index.ts',
        output: {
                dir: './dist',
                format: 'umd',
                name: 'sap-product-browser',
                sourcemap: true
        },
        plugins: [
            typescript({
                include: '**/*.{ts,js}' ,
                tsconfigOverride: {
                    compilerOptions:{
                        module: "es6"}
                },
                typescript: require('typescript')}),
            resolve(),
            commonjs({ include: 'node_modules/**' })
        ]
    },
    {
        input: './src/index.ts',
        output: {
            file: 'dist/index.main.js',
            format: 'cjs',
            sourcemap: true
        },
        plugins: [
            typescript({ include: '**/*.{ts,js}' ,

                tsconfigOverride: {
                    compilerOptions:{
                        module: "es6"}
                },
                typescript: require('typescript')}),
            resolve(),
            commonjs({ include: 'node_modules/**' })
        ]
    },
    {
        input: './src/index.ts',
        output: {
            file: 'dist/index.module.js',
            format: 'es',
            sourcemap: true
        },
        plugins: [
            typescript({ include: '**/*.{ts,js}' ,
                tsconfigOverride: {
                    compilerOptions:{
                    module: "es6"}
                },
                typescript: require('typescript')}),
            resolve(),
            commonjs({ include: 'node_modules/**' })
        ]
    }
];
