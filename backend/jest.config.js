module.exports = {
    roots: ['<rootDir>/app', '<rootDir>/tests'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    testPathIgnorePatterns: ['/node_modules/', '<rootDir>/dist/'],
}
