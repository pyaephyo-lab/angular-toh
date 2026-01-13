// Karma configuration file
// https://karma-runner.github.io/1.0/config/configuration-file.html

process.env.CHROME_BIN =
  process.env.CHROME_BIN ||
  '/usr/bin/chromium' ||
  '/usr/bin/chromium-browser';

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],

    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-junit-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],

    client: {
      jasmine: {},
      clearContext: false
    },

    jasmineHtmlReporter: {
      suppressAll: true
    },

    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/toh'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' }
      ]
    },

    reporters: ['progress', 'junit'],

    junitReporter: {
      outputDir: 'test-results',
      outputFile: 'test-results.xml',
      useBrowserName: false
    },

    // ✅ IMPORTANT PART
    browsers: ['ChromeHeadlessCI'],

    customLaunchers: {
      ChromeHeadlessCI: {
        base: 'ChromeHeadless',
        flags: [
          '--no-sandbox',
          '--disable-gpu',
          '--disable-dev-shm-usage'
        ]
      }
    },

    restartOnFileChange: false
  });
};
