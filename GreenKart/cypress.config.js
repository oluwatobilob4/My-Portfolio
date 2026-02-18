const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,

  e2e: {
    baseUrl: "https://rahulshettyacademy.com/seleniumPractise/#/",
    watchForFileChanges: false,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 60000,
    viewportHeight: 800,
    viewportWidth: 1500,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
