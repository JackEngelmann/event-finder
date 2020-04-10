module.exports = {
    roots: ['<rootDir>/app'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    testPathIgnorePatterns: ['/node_modules/', '<rootDir>/dist/'],
}
