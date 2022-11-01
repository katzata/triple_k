const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // on('file:preprocessor', (file) => {
      //   // ...
      //   // console.log(file);
      // })
    },
    viewportWidth: 1920,
    viewportHeight: 1080,
  },
  component: {
    devServer: {
      webpackConfig: require('./webpack.cy.config.js'),
      bundler: "webpack",
      baseUrl: "http://localhost:3000",
    },
    specPattern: "**/*.cy.js",
  },
});
