module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>/tests'],
    // setupFiles: ['<rootDir>/tests/setup.ts'],
    setupFiles: ['dotenv/config'],
    collectCoverageFrom: ['<rootDir>/src/**/*.ts', '!**/node_modules/**'],
};