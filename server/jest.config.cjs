module.exports = {
    preset: "ts-jest",
    testRegex: "\\.test\\.ts$",
    testEnvironment: "node",
    transform: {},
    collectCoverage: true,
    coverageReporters: ["text", "html"],
    coverageDirectory: "<rootDir>/coverage",
    modulePathIgnorePatterns: ["<rootDir>/dist/"],
    moduleNameMapper: {
        "^core$": "<rootDir>/node_modules/core",
    },
    moduleDirectories: ["<rootDir>/node_modules", "node_modules"],
};
