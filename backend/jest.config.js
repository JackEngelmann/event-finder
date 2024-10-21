module.exports = {
    roots: ['<rootDir>/src', '<rootDir>/tests'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    testPathIgnorePatterns: ['/node_modules/', '<rootDir>/dist/'],
}
