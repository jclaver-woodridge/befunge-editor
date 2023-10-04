import type { Config } from 'jest';

const config: Config = {
    rootDir: 'src',
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
        '^.+\\.(css|less|scss)$': 'babel-jest',
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
    moduleFileExtensions: [
        'tsx',
        'ts',
        'js',
        'jsx',
        'json',
        'node',
        'module.scss',
    ],
    moduleDirectories: ['node_modules', '.'],
    moduleNameMapper: {
        '^.+\\.(css|less|scss)$': 'babel-jest',
        '^.+\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            'mocks/fileMock.js',
    },
};

export default config;
