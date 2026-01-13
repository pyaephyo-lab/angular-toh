// Karma configuration file
// https://karma-runner.github.io/1.0/config/configuration-file.html

if (!process.env.CHROME_BIN) {
  if (require('fs').existsSync('/usr/bin/chromium')) {
    process.env.CHROME_BIN = '/usr/bin/chromium';
  } else if (require('fs').existsSync('/usr/bin/chromium-browser')) {
    process.env.CHROME_BIN = '/usr/bin/chromium-browser';
  } else if (require('fs').existsSync('/usr/bin/google-chrome')) {
    process.env.CHROME_BIN = '/usr/bin/google-chrome';
  }
}
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
