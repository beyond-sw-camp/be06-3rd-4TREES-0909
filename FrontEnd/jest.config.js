module.exports = {
    reporters: [
        'default',
        [
            'jest-junit',
            { outputDirectory: 'test-results', outputName: "report.xml" }
        ],
    ],
    transformIgnorePattern: ["/node_modules/(?!axios).+\\.js$"],
    preset: '@vue/cli-plugin-unit-jest'
};
