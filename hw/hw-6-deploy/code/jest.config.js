export default {
    testEnvironment: "jsdom",
    transform: {
        "^.+\\.js$": "babel-jest"
    },
    moduleFileExtensions: [
        "js"
    ],
    testMatch: [
        "**/__tests__/**/*.js",
        "**/?(*.)+(spec|test).js"
    ],
    collectCoverageFrom: [
        "src/**/*.js",
        "!src/index.js",
        "!src/scripts/index.js",
        "!src/scripts/ui/index.js",
        "!src/scripts/features/**"
    ]
};