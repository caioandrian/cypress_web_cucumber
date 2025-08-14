const { defineConfig } = require('cypress')

module.exports = defineConfig({
  viewportWidth: 1280,
  viewportHeight: 720,
  defaultCommandTimeout: 4000,
  pageLoadTimeout: 40000,
  experimentalMemoryManagement: false,
  includeShadowDom: true,
  numTestsKeptInMemory: 5,
  screenshotsFolder: 'cypress/reports/screenshots',
  'cucumberautocomplete.strictGherkinCompletion': true,
  video: false,
  videoCompression: 20,
  modifyObstructiveCode: false,
  experimentalSourceRewriting: false,
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    overwrite: false,
    html: false,
    video: false,
    json: true,
    reporterEnabled: 'cypress-mochawesome-reporter, mocha-junit-reporter',
    cypressMochawesomeReporterReporterOptions: {
      reporterDir: 'cypress/reports',
      charts: true,
      reportPageTitle: 'Report Tests ',
      embeddedScreenshots: true,
      inlineAssets: true,
    },
    mochaJunitReporterReporterOptions: {
      mochaFile: 'cypress/reports/junit/test-results-[hash].xml',
      toConsole: true,
    },
  },
  chromeWebSecurity: false,
  retries: {
    runMode: 1,
    openMode: 0,
  },
  e2e: {
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    excludeSpecPattern: '*.js',
    specPattern: '**/*.{feature,features}',
    supportFile: 'cypress/support/e2e.js'  
  }
})
