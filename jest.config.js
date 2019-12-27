module.exports = {
    testPathIgnorePatterns: ["<rootDir>/.next", "<rootDir>/node_modules/"],
    moduleNameMapper: {
        "~(.*)$": "<rootDir>/$1",
    },
    setupFiles: ["dotenv/config"],
    transform: {
        "\\.(graphql|gql)$": "jest-transform-graphql",
        ".*": "babel-jest",
    },
}
