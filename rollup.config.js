
import babel from 'rollup-plugin-babel';
import pkg from './package.json';

export default [
    {
        input: 'lib/index.js',
        output: {
            format: 'cjs',
            file: pkg.main,
            name: 'eusiNode'
        },
        external: Object.keys(Object.assign({}, pkg.dependencies, pkg.peerDependencies)),
        plugins: [
            babel({
                exclude: ['node_modules/**']
            })
        ]
    }
];
